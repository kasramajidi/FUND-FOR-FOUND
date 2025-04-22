import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface PasswordData {
  userId: string;
  password: string;
}

interface ApiResponse {
  message: string;
  success: boolean;
}

const apiChangePassword = async (data: PasswordData): Promise<ApiResponse> => {
  try {
    const response = await axios.put<ApiResponse>(
      `https://fund-for-found-back-end.onrender.com/api/users/${data.userId}`,
      {
        password: data.password,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
    throw new Error("Unknown error occurred");
  }
};

export default function useChangePassword() {
  return useMutation({
    mutationFn: apiChangePassword,
    onError: (error: Error) => {
      console.error("Error changing password:", error.message);
    },
  });
}
