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
  const response = await axios.put(
    `http://localhost:1337/api/teams/${data.id}`,
    {
      data: {
        name: data.name,
        discription: data.description,
        email: data.email,
      },
    }
  );
  return response.data;
};

export default function useUpdateTeam() {
  return useMutation({
    mutationFn: apiUpdateTeam,
    onSuccess: (data) => {
      console.log(data);
    },
  });
}
