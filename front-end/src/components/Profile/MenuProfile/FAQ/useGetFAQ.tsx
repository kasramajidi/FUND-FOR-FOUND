import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface FAQ {
  documentId: number;
  question: string;
  answer: string;
}

interface StrapiResponse {
  data: FAQ[];
}

const getFAQ = async (): Promise<StrapiResponse> => {
  const response = await axios.get("http://localhost:1337/api/faqs");
  return response.data;
};

export const useGetFAQ = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: getFAQ,
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchInterval: 5000,
  });
};
