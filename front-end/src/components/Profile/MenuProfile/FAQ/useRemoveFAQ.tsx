import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface FAQ {
  id: number;
}

const removeFAQ = async (faq: FAQ) => {
  const response = await axios.delete(
    `https://fund-for-found-u0xg.onrender.com/api/faqs/${faq.id}`
  );
  return response.data;
};

export const useRemoveFAQ = () => {
  return useMutation({
    mutationFn: removeFAQ,
  });
};
