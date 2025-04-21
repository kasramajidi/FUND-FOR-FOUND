import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface User {
  email: string;
}

interface ApiResponse {
  message: string;
  success: boolean;
}

const apiPostEmail = async (user: User): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      "https://fund-for-found-back-end.onrender.com/api/email/send-verification",
      {
        email: user.email,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "خطا در ارسال ایمیل");
    }
    throw new Error("خطای ناشناخته در ارسال ایمیل");
  }
};

export default function usePostEmail() {
  return useMutation({
    mutationFn: apiPostEmail,
    onError: (error: Error) => {
      console.error("Error sending verification email:", error.message);
    },
  });
}
