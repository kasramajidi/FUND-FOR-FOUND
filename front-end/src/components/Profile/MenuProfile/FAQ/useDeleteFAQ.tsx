import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface DeleteFAQParams {
  id: number;
}

const deleteFAQ = async (params: DeleteFAQParams) => {
  const response = await axios.delete(
    `http://localhost:1337/api/faqs/${params.id}`
  );
  return response.data;
};

export const useDeleteFAQ = () => {
  return useMutation({
    mutationFn: deleteFAQ,
  });
};
