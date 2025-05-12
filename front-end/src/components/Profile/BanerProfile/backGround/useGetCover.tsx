"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface GetApiCover {
  brandId: string;
  cover: string;
  brand: string;
  pictureProfile: string;
  Communication: string[];
}

export default function useGetCover() {
  const mutation = useMutation({
    mutationFn: async (brandId: string) => {
      try {
        const response = await axios.get<GetApiCover>(
          `http://localhost:1337/api/brands/${brandId}`
        );
        return response.data;
      } catch (err) {
        console.error("Error fetching cover:", err);
        throw err;
      }
    },
  });

  return {
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    mutate: mutation.mutate,
  };
}
