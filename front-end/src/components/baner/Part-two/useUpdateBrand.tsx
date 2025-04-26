import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface IDData {
  brandId: number;
  description: string;
  communications: string;
}

interface ApiResponse {
  data: {
    id: number;
    attributes: {
      description: string;
      communications: string;
      updatedAt: string;
    };
  };
  meta: {
    message?: string;
  };
}

const apiUpdateBrand = async (data: IDData): Promise<ApiResponse> => {
  try {
    // Debug log for request
    const url = `https://confident-vision-production-f446.up.railway.app/api/brands/${data.brandId}`;
    const payload = {
      data: {
        description: data.description,
        communications: data.communications,
      },
    };
    console.log("DEBUG API REQUEST", { url, payload });
    const response = await axios.put<ApiResponse>(url, payload);
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
