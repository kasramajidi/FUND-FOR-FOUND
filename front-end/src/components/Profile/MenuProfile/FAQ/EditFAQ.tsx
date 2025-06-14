import React, { useState, useEffect } from "react";
import { useUpdateFAQ } from "./useUpdateFAQ";
import { useDeleteFAQ } from "./useDeleteFAQ";

interface FAQItem {
  documentId: string;
  question: string;
  answer: string;
}

interface EditFAQProps {
  onClose: () => void;
  faq: FAQItem;
}

export default function EditFAQ({ onClose, faq }: EditFAQProps) {
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const maxQuestion = 200;
  const maxAnswer = 500;
  const updateFAQ = useUpdateFAQ();
  const deleteFAQ = useDeleteFAQ();

  useEffect(() => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
  }, [faq]);

  const handleUpdate = () => {
    updateFAQ.mutate(
      {
        id: faq.documentId,
        question,
        answer,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const handleDelete = () => {
    deleteFAQ.mutate(
      { id: faq.documentId },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(80,80,80,0.7)] backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg w-[700px] max-w-[95vw] p-10 flex flex-col gap-8 max-sm:p-6 max-sm:gap-6">
        <div className="flex flex-col gap-6 max-sm:gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[rgba(68,68,68,1)] font-medium max-sm:text-sm">
                Question
              </label>
              <span className="text-[rgba(141,117,247,1)] text-sm max-sm:text-xs">
                {question.length}/{maxQuestion}
              </span>
            </div>
            <input
              type="text"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value.slice(0, maxQuestion))
              }
              className="w-full border-2 border-[rgba(141,117,247,1)] rounded-lg px-4 py-3 text-base text-[rgba(80,80,80,1)] focus:outline-none focus:ring-1 focus:ring-[rgba(100,79,193,1)] transition max-sm:py-2 max-sm:text-sm"
              maxLength={maxQuestion}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[rgba(68,68,68,1)] font-medium max-sm:text-sm">
                Answer
              </label>
              <span className="text-[rgba(141,117,247,1)] text-sm max-sm:text-xs">
                {answer.length}/{maxAnswer}
              </span>
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value.slice(0, maxAnswer))}
              className="w-full border-2 border-[rgba(141,117,247,1)] rounded-lg px-4 py-3 text-base text-[rgba(80,80,80,1)] focus:outline-none focus:ring-1 focus:ring-[rgba(100,79,193,1)] transition resize-none max-sm:py-2 max-sm:text-sm"
              rows={3}
              maxLength={maxAnswer}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4 max-sm:gap-2 max-sm:mt-2">
          <button
            className="px-6 py-2 rounded border border-[rgba(141,117,247,1)] text-[rgba(141,117,247,1)] bg-white font-medium hover:bg-[rgba(245,245,245,1)] transition max-sm:px-4 max-sm:py-1.5 max-sm:text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteFAQ.isPending}
            className="px-6 py-2 rounded border border-[rgba(170,153,236,1)] text-[rgba(100,79,193,1)] cursor-pointer bg-[rgba(237,233,254,1)] font-medium hover:bg-[rgba(237,233,254,0.9)] transition disabled:opacity-60 max-sm:px-4 max-sm:py-1.5 max-sm:text-sm"
          >
            {deleteFAQ.isPending ? "Deleting..." : "Delete question"}
          </button>
          <button
            onClick={handleUpdate}
            disabled={updateFAQ.isPending}
            className="px-8 py-2 rounded bg-[rgba(100,79,193,1)] text-white font-semibold hover:bg-[rgba(100,79,193,0.9)] transition disabled:opacity-60 max-sm:px-4 max-sm:py-1.5 max-sm:text-sm"
          >
            {updateFAQ.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
