import axios from "axios";
import { useQuery } from "react-query";

const gettAllCategories = async () => {
  try {
    const { data } = await axios.get("/api/categorie");
    return data;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw error;
  }
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categoriesList"],

    queryFn: gettAllCategories,
  });
};
