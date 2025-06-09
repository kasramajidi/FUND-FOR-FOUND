import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface FAQ {
  question: string;
  answer: string;
}

const postFAQ = async (faq: FAQ) => {
  const response = await axios.post("http://localhost:1337/api/faqs", {
    data: { question: faq.question, answer: faq.answer },
  });
  return response.data;
};

export const usePostFAQ = () => {
  return useMutation({
    mutationFn: postFAQ,
  });
};
