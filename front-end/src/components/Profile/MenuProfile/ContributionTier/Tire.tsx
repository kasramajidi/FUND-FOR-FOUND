import React, { useState } from "react";
import Image from "next/image";
import OpenTire from "./OpenTire";
import useGetTire from "./useGetTire";
import OpenTireEdit from "./OpenTireEdit";

interface TireProps {
  brandId: number;
}

const isEditable = (createdAt: string): boolean => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffTime = now.getTime() - createdDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 3;
};

export default function Tire({ brandId }: TireProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTireId, setSelectedTireId] = useState<number | null>(null);
  const { data: tires, isLoading, error } = useGetTire(brandId);

  if (isLoading) return <div>Loading tires...</div>;
  if (error) return <div>Error loading tires</div>;

  // تبدیل داده‌های API به فرمت کارت
  const apiTiers =
    tires?.map((tire) => ({
      id: tire.documentId,
      title: tire.name,
      description: tire.discription,
      image: tire.tirCover || null,
      text: tire.name,
      amount: tire.amount,
      createdAt: tire.createdAt,
      footer: (
        <button
          className={`w-full rounded-md py-2 mt-4 ${
            isEditable(tire.createdAt)
              ? "bg-purple-600 text-white cursor-pointer"
              : "bg-purple-600 text-white cursor-not-allowed"
          }`}
          disabled={!isEditable(tire.createdAt)}
          onClick={() => {
            if (isEditable(tire.createdAt)) {
              setSelectedTireId(tire.id);
              setIsEdit(true);
            }
          }}
        >
          {isEditable(tire.createdAt)
            ? "Edit Tire"
            : "This tier cannot be edited"}
        </button>
      ),
      extra: (
        <p className="text-xs text-[rgba(149,149,149,1)] mt-2">
          {tire.discription}
        </p>
      ),
    })) || [];

  // کارت Add Tier همیشه آخر باشد
  const allTiers = [
    ...apiTiers,
    {
      isAdd: true,
      title: "Add Tier",
      content: (
        <div className="flex flex-col items-center justify-center h-full py-8">
          <button
            className="bg-[rgba(100,79,193,1)] text-white rounded-2xl w-24 h-24 flex items-center justify-center text-5xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            +
          </button>
        </div>
      ),
      headerClass: "bg-purple-700 text-white",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {allTiers.map((tier, idx) => (
          <div
            key={idx}
            className="border rounded-lg shadow-sm flex flex-col min-h-[350px] bg-white"
          >
            <div className="rounded-t-lg bg-[rgba(100,79,193,1)] py-2 text-center text-white">
              {tier.title}
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              {"description" in tier &&
                !("isAdd" in tier) &&
                tier.description && (
                  <div className="font-semibold mt-4">{tier.description}</div>
                )}
              {"isAdd" in tier ? (
                tier.content
              ) : tier.image ? (
                <Image
                  className=" border-none text-xl rounded-lg py-6 my-4"
                  width={240}
                  height={150}
                  alt={tier.title}
                  src={tier.image}
                />
              ) : (
                <div className="bg-[rgba(237,233,254,1)] text-white font-bold text-xl rounded-lg py-6 my-4 text-center w-[240px] h-[150px] flex items-center justify-center">
                  {tier.text}
                </div>
              )}
              {"extra" in tier && tier.extra}
              {"amount" in tier && (
                <div className="text-lg font-bold text-purple-600 mt-2">
                  ${tier.amount}
                </div>
              )}
            </div>
            {"footer" in tier && tier.footer && (
              <div className="px-4 pb-4">{tier.footer}</div>
            )}
          </div>
        ))}
      </div>
      {isOpen && (
        <OpenTire brandId={brandId} onClose={() => setIsOpen(false)} />
      )}
      {isEdit && selectedTireId && (
        <OpenTireEdit
          brandId={brandId}
          tireId={selectedTireId}
          onClose={() => {
            setIsEdit(false);
            setSelectedTireId(null);
          }}
        />
      )}
    </>
  );
}
