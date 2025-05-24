import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface TireData {
  name: string;
  discription: string;
  amount: number;
  tirCover?: string;
}

export default function useUpdateTire(brandId: number, tireId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TireData) =>
      axios.put(`http://localhost:1337/api/tires/${tireId}`, { data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand-tires", brandId] });
    },
    onError: (error: Error) => {
      console.error("Error updating tire:", error.message);
    },
  });
}
