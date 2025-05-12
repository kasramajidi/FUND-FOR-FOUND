"use client";
import NavbarBaner from "@/components/baner/part-one/NavbarBaner";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useGetBrand from "@/components/baner/Part-two/useGetBrand";

export default function PartThree() {
  const [brandId, setBrandId] = useState<string | null>(null);
  const { data, isError, error } = useGetBrand(brandId);

  useEffect(() => {
    const storedBrandId = localStorage.getItem("brandId");
    if (storedBrandId) {
      const numericBrandId = parseInt(storedBrandId, 10);
      if (!isNaN(numericBrandId)) {
        setBrandId(String(numericBrandId - 1));
      }
    }
  }, []);

  const handleButtonClick = () => {
    localStorage.removeItem("brandId");
  };

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 sm:px-6">
      <NavbarBaner />
      <div className="flex flex-col items-center justify-center mt-8 flex-1 w-full lg:mt-[50px]">
        <h1 className="text-3xl md:text-4xl font-semibold text-[rgba(100,79,193,1)] mb-8 mt-8 lg:mb-[50px]">
          Congratulation!
        </h1>
        {/* Piggy bank illustration (SVG) */}
        <div className="mb-8 w-full flex justify-center">
          <Image
            src={"/image/Frame.svg"}
            alt="Frame-bank"
            width={300}
            height={300}
            className="w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] lg:w-[600px] lg:h-[600px]"
          />
        </div>
        <div className="text-center mb-4 mt-8 lg:mt-[50px]">
          <p className="text-lg sm:text-xl font-medium text-gray-700 mb-2">
            Your Creative Starter has been approved by our experts!
          </p>
          <p className="text-[rgba(149,149,149,1)] text-xs sm:text-sm">
            Welcome aboard! Lets dive in and get started
          </p>
        </div>
        <Link href={`/profile/${data?.id}`}>
          <button
            onClick={handleButtonClick}
            className="mt-4 sm:mt-6 px-4 py-2 sm:px-8 sm:py-2 bg-[rgba(100,79,193,1)] text-white rounded-md cursor-pointer text-base sm:text-lg font-semibold shadow hover:bg-[rgba(100,50,193)] transition w-full max-w-xs"
          >
            Go to my profile
          </button>
        </Link>
      </div>
    </div>
  );
}
