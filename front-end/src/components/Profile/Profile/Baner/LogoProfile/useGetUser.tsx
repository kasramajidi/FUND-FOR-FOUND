"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useGetUser() {
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        // Get userData from localStorage
        const userDataString = localStorage.getItem("userData");
        if (!userDataString) {
          throw new Error("No user data found in localStorage");
        }

        const userData = JSON.parse(userDataString);
        const userId = userData.id;

        if (!userId) {
          throw new Error("User ID not found in userData");
        }

        const response = await axios.get(
          `https://fund-for-found-u0xg.onrender.com/api/users/${userId}`
        );
        return response.data;
      } catch (err) {
        console.error("Error fetching user data:", err);
        throw err;
      }
    },
  });

  return {
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    mutate: mutation.mutate,
  };
}
