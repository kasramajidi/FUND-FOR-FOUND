import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UpdateTeamProps {
  id: string | number;
  name: string;
  role: string;
  description: string;
  email: string;
}

const apiUpdateTeam = async (data: UpdateTeamProps) => {
  // Get JWT token from localStorage
  const jwt = localStorage.getItem("jwt");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add JWT token to headers if it exists
  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }

  const response = await axios.put(
    `https://fund-for-found-u0xg.onrender.com/api/teams/${data.id}`,
    {
      data: {
        name: data.name,
        discription: data.description,
        email: data.email,
      },
    },
    { headers }
  );
  return response.data;
};

export default function useUpdateTeam() {
  return useMutation({
    mutationFn: apiUpdateTeam,
  });
}
