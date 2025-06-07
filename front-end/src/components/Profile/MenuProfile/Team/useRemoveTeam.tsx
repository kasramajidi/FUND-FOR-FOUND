import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

interface RemoveTeamData {
  id: number;
  name: string;
}

const removeTeam = async (data: RemoveTeamData) => {
  const response = await axios.delete(
    `http://localhost:1337/api/teams/${data.id}`
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
