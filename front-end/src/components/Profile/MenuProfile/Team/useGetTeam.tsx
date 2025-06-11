import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiGetTeam = async (brandId) => {
  try {
    const url = `https://fund-for-found-u0xg.onrender.com/api/brands/${brandId}`;
    const response = await axios.get(url);
    return response.data.team || null;
  } catch (error) {
    throw error;
  }
};

export default function useGetTeam(brandId) {
  return useQuery({
    queryKey: ["team", brandId],
    queryFn: () => apiGetTeam(brandId),
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!brandId, // فقط زمانی اجرا شود که brandId موجود باشد
    refetchInterval: 5000,
  });
}
