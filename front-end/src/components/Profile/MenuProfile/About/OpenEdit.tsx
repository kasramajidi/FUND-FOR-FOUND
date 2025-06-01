"use client";

import { useEffect, useRef, useState } from "react";
import { usePostAbout } from "./usePostAbout";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkCircle, IoAlertCircle } from "react-icons/io5";

type EditorBlock = {
  type: string;
  data: { text: string };
};
type EditorData = {
  blocks: EditorBlock[];
};

interface AlertProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Alert = ({ message, type, onClose }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
        type === "success"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {type === "success" ? (
        <IoCheckmarkCircle className="w-5 h-5" />
      ) : (
        <IoAlertCircle className="w-5 h-5" />
      )}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2">
        <IoMdClose className="w-4 h-4" />
      </button>
    </div>
  );
};

interface EditorBoxProps {
  onSave?: (data) => void;
  onClose?: () => void;
  brandId: number;
}

export default function OpenEdit(props: EditorBoxProps) {
  const editorInstance = useRef<InstanceType<
    typeof import("@editorjs/editorjs").default
  > | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const holderId = "editorjs";
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isTextEdited, setIsTextEdited] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { onSave, onClose, brandId } = props;
  const { mutate: postAbout } = usePostAbout(brandId);
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

  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({ message, type });
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        setIsImageUploaded(true);
        return data.secure_url;
      }
      throw new Error("Failed to upload image");
    } catch (error) {
      showAlert("Failed to upload image. Please try again.", "error");
      throw error;
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        const uploadedUrl = await uploadToCloudinary(file);
        setImageUrl(uploadedUrl);
        showAlert("Image uploaded successfully!", "success");
      } catch (error) {
        console.error("Error uploading image:", error);
        setSelectedImage(null);
        setImageUrl(null);
      }
    }
  };

  const handleSave = async () => {
    if (!isImageUploaded) {
      showAlert("Please upload an image first!", "error");
      return;
    }

    if (!isTextEdited) {
      showAlert("Please edit the text content first!", "error");
      return;
    }

    if (!imageUrl) {
      showAlert("Image upload is required!", "error");
      return;
    }

    let outputData = editorData;
    if (isEditing && editorInstance.current) {
      outputData = await editorInstance.current.save();
      setEditorData(outputData);
      setIsEditing(false);
    }

    try {
      await postAbout({
        picture: imageUrl,
        description: JSON.stringify(outputData),
      });

      showAlert("About information saved successfully!", "success");
      if (onSave) {
        onSave(outputData);
      }
      if (onClose) {
        onClose();
      }
    } catch {
      showAlert("Failed to save information. Please try again.", "error");
    }
  };

  const handleEdit = () => {
    if (!isImageUploaded) {
      showAlert("Please upload an image first!", "error");
      return;
    }
    setIsEditing(true);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

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
          setIsTextEdited(true);
          if (onSave) {
            onSave(newData);
          }
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

  return (
    <>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 w-[98%] sm:w-[95%] md:w-[85%] lg:w-[75%] xl:w-[65%] max-h-[90vh] overflow-y-auto relative max-lg:p-2 max-lg:w-[95%]">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 max-lg:top-1 max-lg:right-1 max-lg:p-1.5"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer max-lg:w-4 max-lg:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div className="w-full mx-auto p-2 sm:p-3 md:p-4 lg:p-5 max-lg:p-1.5">
            <div className="relative rounded-xl p-2 sm:p-4 md:p-6 lg:p-8 bg-white max-lg:p-2">
              <div
                onClick={handleImageClick}
                className="w-full h-[150px] sm:h-[180px] md:h-[200px] bg-gray-200 rounded-md flex items-center justify-center overflow-hidden mb-4 sm:mb-5 md:mb-6 cursor-pointer hover:bg-gray-300 transition-colors duration-200 relative max-lg:h-[120px] max-lg:mb-3"
              >
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="Selected"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <svg
                    className="w-24 h-24 text-[rgba(199,198,198,1)] max-lg:w-16 max-lg:h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2 2l1.586-1.586a2 2 0 012.828 0L20 18m-4-8h.01M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {isImageUploaded && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs max-lg:px-1.5 max-lg:py-0.5 max-lg:text-[10px]">
                    Uploaded
                  </div>
                )}
              </div>
              <div
                id={holderId}
                className="min-h-[300px] sm:min-h-[400px] md:min-h-[500px] max-lg:min-h-[250px]"
              />
              <div className="flex flex-col gap-2 mt-4 sm:mt-5 md:mt-6 mb-0 items-stretch lg:flex-row lg:justify-end lg:gap-4 max-lg:mt-3 max-lg:gap-1.5">
                <button
                  onClick={handleSave}
                  disabled={!isImageUploaded || !isTextEdited}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-md cursor-pointer bg-[rgba(100,79,193,1)] text-white hover:bg-purple-700 text-sm sm:text-base lg:w-auto max-lg:px-2 max-lg:py-1.5 max-lg:text-xs ${
                    !isImageUploaded || !isTextEdited
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Save
                </button>
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    disabled={!isImageUploaded}
                    className={`w-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-md cursor-pointer border text-gray-600 hover:bg-gray-100 text-sm sm:text-base lg:w-auto max-lg:px-2 max-lg:py-1.5 max-lg:text-xs ${
                      !isImageUploaded ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
