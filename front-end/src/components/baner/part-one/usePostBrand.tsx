"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface Brand {
  brand: string;
  country: string;
  category: string;
  subcategory: string;
  tag: string[];
}

export interface BrandResponse {
  data?: {
    id: number;
    attributes?: {
      brand: string;
      country: string;
      category: string;
      subcategory: string;
      tag: string[];
    };
  };
  id?: number;
}

const postApiBrand = async (user: Brand): Promise<BrandResponse> => {
  const tagArray = Array.isArray(user.tag) ? user.tag : [user.tag];

  console.log("Sending data to API:", {
    data: {
      brand: user.brand,
      country: user.country,
      category: user.category,
      subcategory: user.subcategory,
      tag: tagArray,
      termsOfService: true,
    },
  });

  const response = await axios.post(
    "https://confident-vision-production-f446.up.railway.app/api/brands",
    {
      data: {
        brand: user.brand,
        country: user.country,
        category: user.category,
        subcategory: user.subcategory,
        tag: tagArray,
        termsOfService: true,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("API Response:", response.data);
  return response.data;
};

export default function usePostBrand() {
  const mutation = useMutation<BrandResponse, Error, Brand>({
    mutationFn: (userData: Brand) => postApiBrand(userData),
    onError: (error) => {
      console.error("Error posting brand:", error);
    },
  });

  return mutation;
}
