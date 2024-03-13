import axios from "axios";
import { useQuery } from "react-query";

const getOnePostForAuthor = async (postId) => {
  try {
    const { data } = await axios.get(`/api/users/articles?postId=${postId}`);
    return data;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw error;
  }
};

export const useGetOnePostForAuthor = (postId) => {
  return useQuery({
    queryKey: ["onePostAuthor"],

    queryFn: () => getOnePostForAuthor(postId),
  });
};

const getLastPost = async () => {
  try {
    const { data } = await axios.get(`/api/articles/last?max=${10}`);
    return data;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw error;
  }
};

export const useGetLastPost = () => {
  return useQuery({
    queryKey: ["ListLastPost"],

    queryFn: getLastPost,
  });
};

const getOnePost = async (postId) => {
  try {
    const { data } = await axios.get(`/api/articles/${postId}`);
    return data;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw error;
  }
};

export const useGetOnetPost = (postId) => {
  return useQuery({
    queryKey: ["onePost", postId],

    queryFn: () => getOnePost(postId),
  });
};

const getAuthorPostPersonnal = async (max, skip) => {
  try {
    const { data } = await axios.get(
      `/api/authors/posts/personnal?max=${max}&skip=${skip}`
    );
    return data;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw error;
  }
};

export const useGetPersonnalPost = (max, skip) => {
  return useQuery({
    queryKey: ["personnalPostAuthor"],

    queryFn: () => getAuthorPostPersonnal(max, skip),
  });
};

const getAllPostFromCategory = async (idCategory) => {
  try {
    const { data } = await axios.get(`/api/articles/categories/${idCategory}`);
    return data;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw error;
  }
};

export const useGetAllPostFromCategory = (idCategory) => {
  return useQuery({
    queryKey: ["postFromCategory"],

    queryFn: () => getAllPostFromCategory(idCategory),
  });
};

const getAllPost = async (max, skip) => {
  try {
    const { data } = await axios.get(
      `/api/articles/all?max=${max}&skip=${skip}`
    );
    return data;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw error;
  }
};

export const useGetAllPost = (max, skip) => {
  return useQuery({
    queryKey: ["allPost"],

    queryFn: () => getAllPost(max, skip),
  });
};
