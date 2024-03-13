"use client";
import { ButtonSimple } from "@/components/buttons/Buttons";
import "../../public/style/main.scss";
import "./style.scss";
import { CardPostSimple } from "@/components/cards/Cards";
import TitleSection from "@/components/titleSection/TitleSection";
import { useMutation } from "react-query";
import { useState } from "react";
import { useGetAllPost } from "@/hooks/useArticles";
import { formatDateTime } from "@/utils/date";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ArticlePage() {
  const { data: firstPostAuthor, isLoading } = useGetAllPost(5, 0);
  const [firstLoading, setfirstLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [skipPage, setskipPage] = useState(5);
  const [posts, setPosts] = useState([]);
  const [isVisibleBtnMore, setisVisibleBtnMore] = useState(true);

  if (firstPostAuthor && firstLoading) {
    setPosts((prevPosts) => [...prevPosts, ...firstPostAuthor]);
    setfirstLoading(false);
  }
  const { mutate } = useMutation(
    (skip) => axios.get(`/api/articles/all?max=${5}&skip=${skip}`),
    {
      onSuccess: async (response) => {
        if (response.data.length === 0) {
          setisVisibleBtnMore(false);
          toast.success("Tous les articles sont chargés !");
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data]);
          setIsLoadingMore(false);
        }
      },
      onError: (error) => {
        console.error(error);
        setIsLoadingMore(false);
      },
    }
  );
  const loadingNextDataPage = () => {
    setskipPage((old) => old + 5);
    setIsLoadingMore(true);
    mutate(skipPage);
  };

  return (
    <main className="page__content">
      <section className="section_page post__list">
        <TitleSection
          title={"Découvrez notre collection d'articles"}
          colorClass={"black"}
          overview={
            "Explorez une variété d'articles pour répondre à tous vos besoins"
          }
        />
        <div className="content__post">
          {isLoading
            ? [...Array(8)].map((_, index) => (
                <CardPostSimple
                  key={index}
                  title={""}
                  category={""}
                  cover={""}
                  duration={""}
                  postLink={""}
                  datePost={""}
                  isLoading={true}
                />
              ))
            : posts.map((post, index) => (
                <CardPostSimple
                  key={post.article_id}
                  title={post.title}
                  category={post.categories.name_categorie}
                  cover={post.article_cover}
                  duration={post.read_time_minutes}
                  postLink={`/articles/${post.article_id}`}
                  datePost={formatDateTime(post.date_created)}
                  isLoading={false}
                />
              ))}
          {}
        </div>
        {isVisibleBtnMore && (
          <ButtonSimple
            text={"Voir plus"}
            eventHandler={loadingNextDataPage}
            isEnable={true}
            isAwaiting={isLoadingMore}
          />
        )}
      </section>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}
