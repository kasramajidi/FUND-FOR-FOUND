import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface TireProp {
  name: string;
  discription: string;
  amount: string;
  tirCover: string;
  brand?: number | string;
}

interface ApiResponse {
  data: {
    id: number;
    attributes: Omit<TireProp, "brand">;
    updatedAt: string;
  };
  meta: {
    message?: string;
  };
}

const apiPostTire = async (data: TireProp): Promise<ApiResponse> => {
  try {
    const url = `http://localhost:1337/api/tires`;
    const payload = {
      data: {
        name: data.name,
        discription: data.discription,
        amount: data.amount,
        tirCover: data.tirCover,
        brand: data.brand,
      },
    };
    console.log("DEBUG API REQUEST", { url, payload });
    const response = await axios.post<ApiResponse>(url, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error?.message || "Failed to post tire"
      );
    }
    throw new Error("Unknown error occurred");
  }
};

export default function usePostTire() {
  return useMutation({
    mutationFn: apiPostTire,
    onError: (error: Error) => {
      console.error("Error posting tire:", error.message);
    },
  });
}
