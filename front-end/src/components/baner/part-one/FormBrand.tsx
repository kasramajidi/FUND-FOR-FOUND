"use client";
import { useState } from "react";
import usePostBrand from "./usePostBrand";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SelectCountry from "./SelectCountry";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormData } from "./types";

const brandSchema = yup.object({
  brand: yup.string().required("Brand name is required"),
  country: yup.string().required("Country is required"),
  category: yup.string().required("Category is required"),
  subcategory: yup.string().required("Subcategory is required"),
  tags: yup.array().of(yup.string()),
  agreed: yup.boolean().oneOf([true], "You must agree to the terms of service"),
});

export default function FormBrand() {
  const router = useRouter();
  const { mutateAsync } = usePostBrand();
  const [currentTag, setCurrentTag] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(brandSchema),
    defaultValues: {
      brand: "",
      country: "",
      category: "",
      subcategory: "",
      tags: [],
      agreed: false,
    },
  });

  const tags = watch("tags");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setValue("tags", [...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const onSubmit = async (data: FormData) => {
    try {
      const result = await mutateAsync({
        ...data,
        tag: data.tags,
      });

      if (result.data.id) {
        localStorage.setItem("brandId", result.data.id.toString());
        router.push("/brand/part-two");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto space-y-8 p-6 mt-18"
    >
      <div>
        <h1 className="text-2xl font-semibold text-[rgba(100,79,193,1)] mb-9">
          Basic info
        </h1>
        <h2 className="text-xl text-[rgba(80,80,80,1)] mb-5 font-bold">
          Tell about your Brand/organization
        </h2>
        <p className="text-[rgba(80,80,80,1)] mb-6">
          Provide an overview of the brand or organization you want to register
          on 3F.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-[rgba(68,68,68,1)]"
          >
            Brand/organisation name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="brand"
            {...register("brand")}
            className="mt-1 block w-full h-[39px] rounded-md border-[rgba(141,117,247,1)] p-1 border focus:outline focus:border-[rgba(141,117,247,1)] focus:ring-[rgba(141,117,247,1)]"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-[rgba(68,68,68,1)]"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <SelectCountry register={register} value={watch("country")} />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-[rgba(80,80,80,1)] text-sm">
          Select the primary category that best describes your brand or
          organization, Then select the subcategory that further defines your
          brand or organization
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-[rgba(68,68,68,1)]"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category"
              {...register("category")}
              className="mt-1 block w-full h-[39px] rounded-md border-[rgba(141,117,247,1)] p-1 border focus:outline focus:border-[rgba(141,117,247,1)] focus:ring-[rgba(141,117,247,1)]"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-[rgba(68,68,68,1)]"
            >
              Subcategory <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subcategory"
              {...register("subcategory")}
              className="mt-1 block w-full h-[39px] rounded-md border-[rgba(141,117,247,1)] p-1 border focus:outline focus:border-[rgba(141,117,247,1)] focus:ring-[rgba(141,117,247,1)]"
            />
            {errors.subcategory && (
              <p className="text-red-500 text-sm">
                {errors.subcategory.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-[rgba(68,68,68,1)]"
          >
            Brand tags
          </label>
          <div className="relative">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2 max-w-[calc(100%-20px)]">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-[3px] rounded-md bg-[#E7E7E7] text-[#717171]"
                >
                  <span className="text-sm whitespace-nowrap">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-[#717171] hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
              <input
                type="text"
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder={tags.length === 0 ? "" : ""}
                className="outline-none border-none bg-transparent p-0 focus:ring-0 w-20 flex-grow"
                style={{ minWidth: "60px" }}
              />
            </div>
            <div className="w-full h-[39px] rounded-md border-[rgba(141,117,247,1)] border focus-within:ring-1 focus-within:ring-[rgba(141,117,247,1)] focus-within:border-[rgba(141,117,247,1)]" />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="agreed"
          {...register("agreed")}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="agreed" className="text-sm text-gray-700">
          I agree with the{" "}
          <Link href="#" className="text-purple-600 hover:underline">
            terms of service
          </Link>{" "}
          of 3F.
        </label>
      </div>
      {errors.agreed && (
        <p className="text-red-500 text-sm">{errors.agreed.message}</p>
      )}

      <button
        type="submit"
        disabled={!watch("agreed")}
        className="px-6 py-2 bg-[rgba(100,79,193,1)] text-white rounded-md cursor-pointer hover:bg-[rgba(100,50,193,1)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </form>
  );
}
