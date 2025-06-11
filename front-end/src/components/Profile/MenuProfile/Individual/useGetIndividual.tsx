import { useQuery } from "@tanstack/react-query";
import axios  from "axios";



export default function useGetIndividual() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["individual"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:1337/api/individuals`);
            return response.data;
        }
    });
    return { data, isLoading, error };
}



