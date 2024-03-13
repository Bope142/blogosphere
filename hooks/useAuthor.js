import axios from "axios";
import { useQuery } from "react-query";

const getAuthors = async (max) => {
  try {
    const { data } = await axios.get(`/api/authors?max=${max}`);
    return data;
  } catch (error) {
    console.error("Error while fetching authors list:", error);
    throw error;
  }
};

export const useGetAuthor = (max) => {
  return useQuery({
    queryKey: ["listAuthor", max],

    queryFn: () => getAuthors(max),
  });
};

const getAuthorProfil = async (idAuthor) => {
  try {
    const { data } = await axios.get(`/api/authors/${idAuthor}`);
    return data;
  } catch (error) {
    console.error("Error while fetching authors list:", error);
    throw error;
  }
};

export const useGetProfilAuthor = (idAuthor) => {
  return useQuery({
    queryKey: ["profilAuthor", idAuthor],

    queryFn: () => getAuthorProfil(idAuthor),
  });
};
