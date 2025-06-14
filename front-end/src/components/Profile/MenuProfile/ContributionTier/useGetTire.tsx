import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Communication {
  icon: string;
  input: string;
  label: string;
  value: string;
  placeholder: string;
}

interface Tire {
  id: number;
  documentId: string;
  name: string;
  discription: string;
  amount: number;
  tirCover?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Brand {
  documentId: string;
  brand: string;
  category: string;
  subcategory: string | null;
  tag: string[] | null;
  country: string;
  termsOfService: boolean;
  description: string | null;
  Communication: Communication[] | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  tires: Tire[];
}

const getBrandTires = async (brandId: number): Promise<Tire[]> => {
  try {
    const response = await axios.get<Brand>(
      `https://fund-for-found-u0xg.onrender.com/api/brands/${brandId}`
    );
    return response.data.tires || [];
  } catch (error) {
    console.error("Error fetching brand tires:", error);
    throw error;
  }
};

export default function useGetTire(brandId: number) {
  return useQuery({
    queryKey: ["brand-tires", brandId],
    queryFn: () => getBrandTires(brandId),
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!brandId, // فقط زمانی اجرا شود که brandId موجود باشد
    refetchInterval: 5000,
  });
}
