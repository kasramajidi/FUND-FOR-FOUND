import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const apiPostEmail = async (user: User) => {
  const response = await axios.post(`https://fund-for-found-back-end.onrender.com/api/register`, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  return response.data;
};

export default function usePostData() {
  const router = useRouter();

  return useMutation({
    mutationFn: apiPostEmail,
    onSuccess: () => {
      router.push("/SignUp/Verification-email");
    },
  });
}
