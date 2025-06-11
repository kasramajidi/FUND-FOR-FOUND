import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Team {
  id: number;
  name: string;
  description: string;
  role: string;
  email: string;
}

interface ApiResponse {
  data: {
    id: number;
    attributes: Team;
    updatedAt: string;
  };
  meta: {
    message?: string;
  };
}

const apiGetTeam = async (): Promise<ApiResponse> => {
  try {
    const url = `https://fund-for-found-u0xg.onrender.com/api/teams`;
    const response = await axios.get<ApiResponse>(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default function useGetTeam() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: apiGetTeam,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });
}
