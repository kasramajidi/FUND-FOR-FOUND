import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface FAQ {
  id: number;
}

const removeFAQ = async (faq: FAQ) => {
  const response = await axios.delete(
    `http://localhost:1337/api/faqs/${faq.id}`
  );
  return response.data;
};

export const useRemoveFAQ = () => {
  return useMutation({
    mutationFn: removeFAQ,
  });
};
