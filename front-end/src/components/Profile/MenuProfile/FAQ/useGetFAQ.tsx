import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getBrand = async (brandId) => {
  const response = await axios.get(
    `https://fund-for-found-u0xg.onrender.com/api/brands/${brandId}`
  );
  return response.data.faqs || [];
};

export const useGetFAQ = (brandId) => {
  return useQuery({
    queryKey: ["brand", brandId],
    queryFn: () => getBrand(brandId),
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!brandId, // فقط زمانی اجرا شود که brandId موجود باشد
    refetchInterval: 5000,
  });
};
