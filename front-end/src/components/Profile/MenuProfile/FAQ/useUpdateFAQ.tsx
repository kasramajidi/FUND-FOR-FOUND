import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const updateFAQ = async (faq: FAQ) => {
  // Get JWT token from localStorage
  const jwt = localStorage.getItem("jwt");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add JWT token to headers if it exists
  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }

  const response = await axios.put(
    `https://fund-for-found-u0xg.onrender.com/api/faqs/${faq.id}`,
    {
      data: { question: faq.question, answer: faq.answer },
    },
    { headers }
  );
  return response.data;
};

export const useUpdateFAQ = () => {
  return useMutation({
    mutationFn: updateFAQ,
  });
};
