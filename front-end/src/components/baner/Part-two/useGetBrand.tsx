import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

interface BrandData {
  id: string;
  name: string;
  // Add other brand properties as needed
}

export default function useGetBrand(brandId: string | null) {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.get<BrandData>(
        `https://fund-for-found-u0xg.onrender.com/api/brands/${id}`
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (brandId) {
      mutation.mutate(brandId);
    }
  }, [brandId]);

  return {
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
