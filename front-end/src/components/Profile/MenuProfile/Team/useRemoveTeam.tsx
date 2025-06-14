import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

interface RemoveTeamData {
  id: number;
  name: string;
}

const removeTeam = async (data: RemoveTeamData) => {
  // Get JWT token from localStorage
  const jwt = localStorage.getItem("jwt");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add JWT token to headers if it exists
  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }

  const response = await axios.delete(
    `https://fund-for-found-u0xg.onrender.com/api/teams/${data.id}`,
    { headers }
  );
  return response.data;
};

export default function useRemoveTeam() {
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);
  const [removedTeam, setRemovedTeam] = useState<RemoveTeamData | null>(null);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setRemovedTeam(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const mutation = useMutation({
    mutationFn: removeTeam,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      setRemovedTeam(variables);
      setShowSuccess(true);
    },
  });

  return {
    ...mutation,
    showSuccess,
    removedTeam,
  };
}
