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
    mutationFn: async (data: TireData) => {
      // Get JWT token from localStorage
      const jwt = localStorage.getItem("jwt");

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      // Add JWT token to headers if it exists
      if (jwt) {
        headers["Authorization"] = `Bearer ${jwt}`;
      }

      return axios.put(
        `https://fund-for-found-u0xg.onrender.com/api/tires/${tireId}`,
        { data },
        { headers }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand-tires", brandId] });
    },
    onError: (error: Error) => {
      console.error("Error updating tire:", error.message);
    },
  });
}
