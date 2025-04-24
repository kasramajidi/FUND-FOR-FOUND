import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface User {
  email: string;
  code: number;
}

interface ApiResponse {
  message: string;
  success: boolean;
}

const apiPostEmail = async (user: User): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      "https://confident-vision-production-f446.up.railway.app/api/email/verify-code",
      {
        email: user.email,
        code: user.code,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Verification failed");
    }
    throw new Error("An unknown error occurred during verification.");
  }
};

export default function useSendCode() {
  return useMutation({
    mutationFn: apiPostEmail,
    onError: (error: Error) => {
      console.error("Error sending verification email:", error.message);
    },
  });
}
