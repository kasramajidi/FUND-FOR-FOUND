import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface FAQ {
  question: string;
  answer: string;
}

const postFAQ = async (faq: FAQ) => {
  // Get JWT token from localStorage
  const jwt = localStorage.getItem("jwt");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add JWT token to headers if it exists
  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }

  const response = await axios.post(
    "https://fund-for-found-u0xg.onrender.com/api/faqs",
    {
      data: { question: faq.question, answer: faq.answer },
    },
    { headers }
  );
  return response.data;
};

export const usePostFAQ = () => {
  return useMutation({
    mutationFn: postFAQ,
  });
};
