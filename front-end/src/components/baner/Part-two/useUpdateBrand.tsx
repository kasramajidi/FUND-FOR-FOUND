import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface CommunicationItem {
  label: string;
  value: string;
  icon: string;
  placeholder: string;
  input: string;
}

interface IDData {
  brandId: number;
  description: string;
  Communication: CommunicationItem[];
}

interface ApiResponse {
  data: {
    id: number;
    attributes: {
      description: string;
      Communication: CommunicationItem[];
      updatedAt: string;
    };
  };
  meta: {
    message?: string;
  };
}

const apiUpdateBrand = async (data: IDData): Promise<ApiResponse> => {
  try {
    // Get JWT token from localStorage
    const jwt = localStorage.getItem("jwt");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add JWT token to headers if it exists
    if (jwt) {
      headers["Authorization"] = `Bearer ${jwt}`;
    }

    // Debug log for request
    const url = `https://fund-for-found-u0xg.onrender.com/api/brands/${data.brandId}`;
    const payload = {
      data: {
        description: data.description,
        Communication: data.Communication,
      },
    };
    console.log("DEBUG API REQUEST", { url, payload });
    const response = await axios.put<ApiResponse>(url, payload, { headers });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error?.message || "Failed to update brand"
      );
    }
    throw new Error("Unknown error occurred");
  }
};

export default function useUpdateBrand() {
  return useMutation({
    mutationFn: apiUpdateBrand,
    onError: (error: Error) => {
      console.error("Error updating brand:", error.message);
    },
  });
}
