import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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
    `http://localhost:1337/api/register`,
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
  const { setToken } = useAuth();

  return useMutation<ApiResponse, Error, User>({
    mutationFn: apiPostEmail,
    onSuccess: (data, variables) => {
      // Check if data and necessary fields exist
      if (data && data.jwt && data.user) {
        try {
          // Store JWT using context function
          setToken(data.jwt);

          // Create user data object with all required fields
          const userData = {
            id: data.user.id,
            email: data.user.email,
            firstName: variables.firstName,
            lastName: variables.lastName,
            username: `${variables.firstName} ${variables.lastName}`,
          };

          // Store the complete user data
          localStorage.setItem("userData", JSON.stringify(userData));

          // Log the stored data for verification
          console.log("Stored user data:", userData);
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
