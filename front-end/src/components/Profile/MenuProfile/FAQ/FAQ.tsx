import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import CreateFAQ from "./CreateFAQ";
import EditFAQ from "./EditFAQ";
import { useParams } from "next/navigation";
import { useGetFAQ } from "./useGetFAQ";
interface FAQItem {
  documentId: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const params = useParams();
  const brandId = params.brandId;
  const { data, isLoading } = useGetFAQ(brandId);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [createFAQ, setCreateFAQ] = useState(false);
  const [editFAQ, setEditFAQ] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);

  if (isLoading) return <div>Loading...</div>;

  // مسیر faqs در خروجی جدید:
  const faqs = data || [];

  const handleEdit = (e: React.MouseEvent, item: FAQItem) => {
    e.stopPropagation();
    setSelectedFAQ(item);
    setEditFAQ(true);
  };

  return (
    <div className="w-full  flex flex-col items-center lg:px-3 px-4 md:px-6  gap-12 mt-28 max-lg:gap-6 max-lg:mt-16">
      <div className="flex self-start items-center gap-3 max-lg:gap-2">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)] max-lg:w-2 max-lg:h-2"></div>
        <span className="font-bold text-2xl max-lg:text-lg uppercase">faq</span>
      </div>
      <div className="flex flex-col gap-5 w-full">
        {faqs.length === 0 && <div>No FAQs for this brand.</div>}
        {faqs.map((faq) => (
          <div key={faq.documentId}>
            <div
              className="flex w-full items-center gap-3 cursor-pointer max-sm:gap-2"
              onClick={() => setOpenIndex(openIndex === faq.id ? null : faq.id)}
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={faq.question}
                  readOnly
                  className="w-full border-2 border-[rgba(141,117,247,1)] rounded-lg px-4 pr-12 py-3 text-lg text-[rgba(80,80,80,1)] focus:outline-none focus:ring-1 focus:ring-[rgba(100,79,193,1)] transition cursor-pointer max-sm:text-base max-sm:py-2"
                  style={{ cursor: "pointer" }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  {openIndex === faq.id ? (
                    <FiChevronUp className="text-2xl text-gray-400 transition-transform duration-200 max-sm:text-xl" />
                  ) : (
                    <FiChevronDown className="text-2xl text-gray-400 transition-transform duration-200 max-sm:text-xl" />
                  )}
                </span>
              </div>
              <button
                className="border-2 border-[#8d75f7] rounded-lg p-3 cursor-pointer flex items-center justify-center hover:bg-[#f3f0ff] transition max-sm:p-2"
                tabIndex={-1}
                type="button"
                onClick={(e) =>
                  handleEdit(e, {
                    documentId: faq.documentId,
                    question: faq.question,
                    answer: faq.answer,
                  })
                }
              >
                <MdEdit className="text-[rgba(113,113,113,1)] text-3xl max-sm:text-2xl" />
              </button>
            </div>
            {openIndex === faq.id && (
              <div className="w-full mt-6 bg-white rounded-lg shadow-lg px-8 py-6 text-[rgba(113,113,113,1)] text-lg max-sm:px-4 max-sm:py-4 max-sm:text-base">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        <div className="w-full flex justify-center cursor-pointer mt-8 max-sm:mt-4">
          <button
            className="flex items-center gap-2 px-6 py-2 rounded border border-[rgba(199,198,198,1)] bg-[rgba(245,245,245,1)] text-[rgba(113,113,113,1)] font-medium hover:bg-[rgba(230,230,230,1)] cursor-pointer transition max-sm:px-4 max-sm:py-1.5 max-sm:text-sm"
            onClick={() => setCreateFAQ(true)}
          >
            <span className="text-2xl max-sm:text-xl">+</span>
            <span className="mt-1">Add question</span>
          </button>
        </div>
      </div>
      {createFAQ && <CreateFAQ onClose={() => setCreateFAQ(false)} />}
      {editFAQ && selectedFAQ && (
        <EditFAQ
          onClose={() => {
            setEditFAQ(false);
            setSelectedFAQ(null);
          }}
          faq={selectedFAQ}
        />
      )}
    </div>
  );
}
