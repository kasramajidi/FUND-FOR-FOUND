import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface DeleteFAQParams {
  id: string;
}

const deleteFAQ = async (params: DeleteFAQParams) => {
  // Get JWT token from localStorage
  const jwt = localStorage.getItem("jwt");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add JWT token to headers if it exists
  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }

  const response = await axios.delete(
    `https://fund-for-found-u0xg.onrender.com/api/faqs/${params.id}`,
    { headers }
  );
  return response.data;
};

export const useDeleteFAQ = () => {
  return useMutation({
    mutationFn: deleteFAQ,
  });
};
