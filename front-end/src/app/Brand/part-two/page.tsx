"use client";
import NavbarBaner from "@/components/baner/part-one/NavbarBaner";
import Description from "@/components/baner/Part-two/Description";
import SocialMedia from "@/components/baner/Part-two/SocialMedia";
import { useState } from "react";
import useUpdateBrand from "@/components/baner/Part-two/useUpdateBrand";
import { useRouter } from "next/navigation";

export default function Part_Two() {
  const [description, setDescription] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const updateBrand = useUpdateBrand();
  const router = useRouter();

  const handleContinue = () => {
    const brandId = localStorage.getItem("brandId");
    if (!brandId) {
      alert("Brand id not found!");
      return;
    }
    const brandIdNum = Number(brandId);
    const descriptionStr =
      description?.blocks?.map((b) => b.data.text).join(" ") || "";
    const communicationsStr = socialLinks[0]?.type?.value || "";
    console.log("DEBUG SUBMIT", {
      brandId: brandIdNum,
      description: descriptionStr,
      communications: communicationsStr,
    });
    updateBrand.mutate(
      {
        brandId: brandIdNum,
        description: descriptionStr,
        communications: communicationsStr,
      },
      {
        onSuccess: () => {
          localStorage.removeItem("brandId");
          router.push("/brand/part-three");
        },
      }
    );
  };

  const isDisabled = !description || socialLinks.length === 0;

  return (
    <div>
      <NavbarBaner />
      <div className="max-w-full mx-auto p-5 lg:max-w-3xl lg:p-6 mt-[100px]">
        <h1 className="text-2xl font-semibold text-[rgba(100,79,193,1)] mb-9">
          Basic info
        </h1>
        <h2 className="text-xl text-[rgba(80,80,80,1)] mb-5 font-bold">
          Tell about your Brand/organization
        </h2>
        <p className="text-[rgba(80,80,80,1)] mb--[71px]">
          Provide an overview of the brand or organization you want to register
          on 3F.
        </p>
      </div>
      <Description onSave={setDescription} />
      <div className="max-w-full mx-auto p-5 lg:max-w-3xl lg:p-6 mt-[80px]">
        <h2 className="text-xl text-[rgba(80,80,80,1)] mb-5 font-bold">
          Help your contributors find you faster (at least 3 options)
        </h2>
        <p className="text-[rgba(80,80,80,1)] mb--[71px]">
          Connect your social so the contributors get to know you better and
          find you faster.
        </p>
      </div>
      <SocialMedia onChange={setSocialLinks} />
      <div className="max-w-full mx-auto p-5 lg:max-w-3xl lg:p-6 mt-[80px]">
        <button
          type="submit"
          className="px-6 py-2 bg-[rgba(100,79,193,1)] text-white rounded-md cursor-pointer hover:bg-[rgba(100,50,193,1)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleContinue}
          disabled={isDisabled}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
