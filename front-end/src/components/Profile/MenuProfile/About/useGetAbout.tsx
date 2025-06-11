import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface About {
  id: number;
  picture: string;
  description: string;
}

interface AboutResponse {
  data: About;
}

const getAbout = async (): Promise<AboutResponse> => {
  const response = await axios.get<AboutResponse>(
    "https://fund-for-found-u0xg.onrender.com/api/about-brands"
  );
  return response.data;
};

export const useGetAbout = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });
};
