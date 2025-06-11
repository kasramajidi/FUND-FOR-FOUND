import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useGetIndividual() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["individual"],
    queryFn: async () => {
      const response = await axios.get(
        `https://fund-for-found-u0xg.onrender.com/api/individuals`
      );
      return response.data;
    },
  });
  return { data, isLoading, error };
}
