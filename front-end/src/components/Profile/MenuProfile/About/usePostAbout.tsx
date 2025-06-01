import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface AboutData {
  picture: string;
  description: string;
  brand: number;
}

interface AboutResponseData {
  id: number;
  attributes: AboutData;
}

interface AboutApiResponse {
  data: AboutResponseData;
}

const createOrUpdateAbout = async (
  data: AboutData
): Promise<AboutApiResponse> => {
  try {
    const brandResponse = await axios.get<{
      data: {
        id: number;
        attributes: { about_brand: { data: { id: number } | null } };
      };
    }>(`http://localhost: 1337/api/brands/${data.brand}`);
    const brand = brandResponse.data.data;
    const aboutBrandRelation = brand.attributes.about_brand?.data;
    let aboutId: number;
    if (aboutBrandRelation === null) {
      const createResponse = await axios.post<AboutApiResponse>(
        "http://localhost: 1337/api/about-brands",
        { data }
      );
      aboutId = createResponse.data.data.id;
      await axios.patch(`http://localhost: 1337/api/brands/${brand.id}`, {
        data: { about_brand: { connect: [{ id: aboutId }] } },
      });
      return createResponse.data;
    } else {
      aboutId = aboutBrandRelation.id;
      const updateResponse = await axios.put<AboutApiResponse>(
        `http://localhost: 1337/api/about-brands/${aboutId}`,
        { data }
      );
      return updateResponse.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API error:", error.response?.data);
      throw new Error(
        error.response?.data?.error?.message || "Failed to save about brand"
      );
    }
    console.error("Unknown error:", error);
    throw new Error("Unknown error occurred while saving about brand");
  }
};

export const usePostAbout = (brandId: number) => {
  const queryClient = useQueryClient();

  return useMutation<AboutApiResponse, Error, Omit<AboutData, "brand">>({
    mutationFn: (dataWithoutBrand) =>
      createOrUpdateAbout({ ...dataWithoutBrand, brand: brandId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
      queryClient.invalidateQueries({ queryKey: ["brands", brandId] });
    },
    onError: (error: Error) => {
      console.error("Error saving about brand:", error.message);
    },
  });
};
