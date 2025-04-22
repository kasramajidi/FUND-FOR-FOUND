import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

// Define the expected API response structure
interface ApiResponse {
  jwt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    // Add other relevant user fields if needed
  };
  // Include other potential fields from the response if necessary
}

const apiPostEmail = async (user: User): Promise<ApiResponse> => {
  // Explicitly type the response from axios.post
  const response = await axios.post<ApiResponse>(
    `https://fund-for-found-back-end.onrender.com/api/register`,
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  );
  return response.data;
};

export default function usePostData() {
  const router = useRouter();

  return useMutation<ApiResponse, Error, User>({
    mutationFn: apiPostEmail,
    onSuccess: (data) => {
      // Check if data and necessary fields exist
      if (data && data.jwt && data.user) {
        try {
          // Store JWT and user data in localStorage
          localStorage.setItem("jwt", data.jwt);
          localStorage.setItem("userData", JSON.stringify(data.user));
          console.log("User data and JWT stored in localStorage.");
        } catch (error) {
          console.error("Error storing data in localStorage:", error);
          // Handle potential storage errors (e.g., storage full)
        }
      } else {
        console.warn("Received data is missing jwt or user info.");
        // Handle cases where expected data is not received
      }

      // Navigate to the next page regardless of storage success/failure for now
      // You might want to add error handling before navigation
      router.push("/SignUp/Verification-email");
    },
    onError: (error) => {
      // Add basic error handling
      console.error("Registration failed:", error.message);
      // You might want to show a toast notification to the user here
    },
  });
}