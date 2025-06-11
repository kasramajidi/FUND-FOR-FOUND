import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface TeamData {
  name: string;
  description: string;
  role: ["Admin", "Teammate"];
  email: string;
}

interface ApiResponse {
  data: {
    id: number;
    attributes: Omit<TeamData, "role">;
    updatedAt: string;
  };
  meta: {
    message?: string;
  };
}

const apiCreateTeam = async (data: TeamData): Promise<ApiResponse> => {
  try {
    const url = `https://fund-for-found-u0xg.onrender.com/api/teams`;
    const payload = {
      data: {
        name: data.name,
        discription: data.description,
        role: data.role,
        email: data.email,
      },
    };
    const response = await axios.post<ApiResponse>(url, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API error:", error.response?.data);
      throw new Error(error.response?.data.message || "An error occurred");
    }
    throw error;
  }
};

export default function usePostTeam() {
  return useMutation({
    mutationFn: apiCreateTeam,
    onError: (error: Error) => {
      console.error("Error creating team:", error.message);
    },
  });
}
