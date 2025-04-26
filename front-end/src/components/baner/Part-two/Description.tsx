"use client";

import { useEffect, useRef, useState } from "react";

type EditorBlock = {
  type: string;
  data: { text: string };
};
type EditorData = {
  blocks: EditorBlock[];
};

interface EditorBoxProps {
  onSave?: (data) => void;
}

export default function Description(props: EditorBoxProps) {
  const editorInstance = useRef<InstanceType<
    typeof import("@editorjs/editorjs").default
  > | null>(null);
  const holderId = "editorjs";
  const [isEditing, setIsEditing] = useState(false);
  const [editorData, setEditorData] = useState<EditorData>({
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "<h3 class='text-[rgba(199,198,198,1)] text-xl'>Short Summary</h3>",
        },
      },
      {
        type: "paragraph",
        data: {
          text: "<span class='text-[rgba(199,198,198,1)]'>• Introduce yourself, your team (if you have) and your background.<br>• Briefly describe about the long term and short term goal of your brand and why it's important to you.</span>",
        },
      },
      {
        type: "paragraph",
        data: {
          text: "<h3 class='text-[rgba(199,198,198,1)] text-xl'>The Impact</h3>",
        },
      },
      {
        type: "paragraph",
        data: {
          text: "<span class='text-[rgba(199,198,198,1)]'>• Share more about your brand and highlight how contributions can make a meaningful impact.<br>• Explain why your brand is important to contributors and how it positively influences the world.<br>• Showcase your brand's proven success and past achievements, if applicable.<br>• Help people connect with your brand's mission and build trust by sharing authentic stories and experiences.</span>",
        },
      },
      {
        type: "paragraph",
        data: {
          text: "<h3 class='text-[rgba(199,198,198,1)] text-xl'>The Story</h3>",
        },
      },
      {
        type: "paragraph",
        data: {
          text: "<span class='text-[rgba(199,198,198,1)]'>• Share the vision of your organization and the journey that led to its establishment.</span>",
        },
      },
    ],
  });

  const { onSave } = props;

  const initEditor = async (readOnly: boolean, data: EditorData) => {
    const EditorJSClass = (await import("@editorjs/editorjs")).default;
    if (editorInstance.current) {
      await editorInstance.current.destroy();
      editorInstance.current = null;
    }
    const editor = new EditorJSClass({
      holder: holderId,
      readOnly,
      placeholder: "Start writing here...",
      tools: {},
      data,
      onChange: async () => {
        if (editorInstance.current) {
          const newData = await editorInstance.current.save();
          setEditorData(newData);
        }
      },
      onReady: () => {
        const editorRoot = document.getElementById(holderId);
        if (editorRoot) {
          editorRoot.classList.add(
            "prose",
            "max-w-none",
            "mt-4",
            "text-gray-400",
            "font-normal"
          );
        }
        editorRoot?.querySelectorAll(".ce-header").forEach((el) => {
          el.classList.add(
            "text-gray-300",
            "font-semibold",
            "text-2xl",
            "mb-2",
            "mt-6"
          );
        });
        editorRoot?.querySelectorAll(".ce-paragraph").forEach((el) => {
          el.classList.add("text-gray-400", "text-base", "leading-7");
        });
      },
    });
    editorInstance.current = editor;
  };

  useEffect(() => {
    initEditor(!isEditing, editorData);
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
    // eslint-disable-next-line
  }, [isEditing]);

  const handleSave = async () => {
    let outputData = editorData;
    if (isEditing && editorInstance.current) {
      outputData = await editorInstance.current.save();
      setEditorData(outputData);
      setIsEditing(false);
    }
    if (onSave) {
      onSave(outputData);
    }
  };

  return (
    <div className="max-w-full mx-auto p-5 lg:max-w-3xl lg:p-6">
      <div className="relative border border-purple-300 rounded-xl p-2 shadow-sm bg-white lg:p-8">
        <div id={holderId} />
        <div className="flex flex-col gap-2 mt-4 mb-0 items-stretch lg:flex-row lg:justify-end lg:gap-4 lg:mt-8">
          <button
            onClick={handleSave}
            className="w-full px-4 py-2 rounded-md cursor-pointer bg-[rgba(100,79,193,1)] text-white hover:bg-purple-700 lg:w-auto lg:px-6 lg:py-2"
          >
            Save
          </button>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-4 py-2 rounded-md cursor-pointer border text-gray-600 hover:bg-gray-100 lg:w-auto lg:px-6 lg:py-2"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
