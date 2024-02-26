import axios from "axios";
import { useQuery } from "react-query";

const getOnePostForAuthor = async (authorEmail, postId) => {
  try {
    console.log("getOnePostForAuthor ", authorEmail, postId);
    const { data } = await axios.get(
      `/api/users/articles?email=${authorEmail}&postId=${postId}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw error;
  }
};

export const useGetOnePostForAuthor = (authorEmail, postId) => {
  return useQuery({
    queryKey: ["onePostAuthor"],

    queryFn: () => getOnePostForAuthor(authorEmail, postId),
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
    console.log("ddd", postId);
    const { data } = await axios.get(`/api/articles/${postId}`);
    return data;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw error;
  }
};

export const useGetOnetPost = (postId) => {
  return useQuery({
    queryKey: ["onePost"],

    queryFn: () => getOnePost(postId),
  });
};
