import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const updateFAQ = async (faq: FAQ) => {
  const response = await axios.put(`http://localhost:1337/api/faqs/${faq.id}`, {
    data: { question: faq.question, answer: faq.answer },
  });
  return response.data;
};

export const useUpdateFAQ = () => {
  return useMutation({
    mutationFn: updateFAQ,
  });
};
