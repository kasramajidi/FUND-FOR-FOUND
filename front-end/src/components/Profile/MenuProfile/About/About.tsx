"use client";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import Edit from "./Edit";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const OpenEdit = dynamic(
  () => import("@/components/Profile/MenuProfile/About/OpenEdit"),
  {
    ssr: false,
  }
);

export default function About() {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const brandId = Number(params.brandId);

  if (!brandId || isNaN(brandId)) {
    return null;
  }

  return (
    <div className="flex  px-3 sm:px-4 md:px-6 lg:px-0 flex-col items-start gap-12 mt-28 max-lg:gap-6 max-lg:mt-16">
      <div className="flex items-center gap-3 max-lg:gap-2">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)] max-lg:w-2 max-lg:h-2"></div>
        <span className="font-bold text-2xl max-lg:text-lg">About</span>
        <button
          className="flex items-center ml-[23px] gap-2 py-2 px-5 rounded-lg cursor-pointer text-sm border border-[rgba(215,207,249,1)] text-[rgba(100,79,193,1)] bg-[rgba(237,233,254,1)] hover:bg-[rgba(237,233,254,0.75)] max-lg:ml-3 max-lg:gap-1.5 max-lg:py-1.5 max-lg:px-3 max-lg:text-xs"
          onClick={() => setIsEditing(true)}
        >
          <MdEdit className="max-lg:w-4 max-lg:h-4" /> Edit
        </button>
      </div>
      <Edit />
      {isEditing && (
        <OpenEdit brandId={brandId} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
}
