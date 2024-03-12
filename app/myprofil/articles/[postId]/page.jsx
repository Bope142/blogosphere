"use client";
import React, { Suspense, useRef, useState } from "react";
import { LoaderPage } from "@/components/loaders/Loaders";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "./style.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CardAuthor,
  CardComment,
  CardPostDetails,
} from "@/components/cards/Cards";
import { CardPostSimple } from "@/components/cards/Cards";
import TitleSection from "@/components/titleSection/TitleSection";
import Image from "next/image";
import { ButtonSimple, ButtonSubmitForm } from "@/components/buttons/Buttons";
import { useGetOnePostForAuthor } from "@/hooks/useArticles";
import { formatDateTime } from "@/utils/date";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import NotFound from "@/components/sectionNoFound/404";

const SectionPost = ({ nameAuthor, imageAuthor, post, isLoading }) => {
  const queryClient = useQueryClient();
  const { mutate: likePost } = useMutation(
    (newLike) => axios.post("/api/articles/likes", newLike),
    {
      onSuccess: async (response) => {
        queryClient.invalidateQueries("onePostAuthor", post.article_id);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  const handleClickLike = (postId) => {
    likePost({
      article_id: postId,
    });
  };

  return isLoading ? (
    <CardPostDetails
      postCover={""}
      postTitle={""}
      postCategory={""}
      profilAuthor={""}
      nameAuthor={""}
      like={""}
      comment={""}
      postText={""}
      postDuration={""}
      postDateTime={""}
      isLoading={isLoading}
    />
  ) : (
    <CardPostDetails
      postCover={post.article_cover}
      postTitle={post.title}
      postCategory={post.categories.name_categorie}
      profilAuthor={imageAuthor}
      nameAuthor={nameAuthor}
      like={post.likes.length}
      comment={post.comments.length}
      postText={post.content}
      postDuration={post.read_time_minutes}
      postDateTime={post.date_created}
      isLoading={isLoading}
      likeEventHandler={() => handleClickLike(post.article_id)}
    />
  );
};

const SectionAddComment = ({ imageAuthor, postId }) => {
  const [awaitBtnComment, setAwaitBtnComment] = useState(false);
  const queryClient = useQueryClient();
  const editorCommentRef = useRef(null);
  const { mutate: addComment } = useMutation(
    (newComment) => axios.post("/api/articles/comments", newComment),
    {
      onSuccess: async (response) => {
        queryClient.invalidateQueries("onePostAuthor", postId);
        setAwaitBtnComment(false);
        toast.success(
          "Félicitations ! Votre commentaire a été créé avec succès."
        );
        editorCommentRef.current.value = "";
      },
      onError: (error) => {
        setAwaitBtnComment(false);
        console.error(error);
        toast.error(
          "Échec de la création du commentaire. Veuillez réessayer ultérieurement."
        );
      },
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAwaitBtnComment(true);
    let form = e.target;
    let formData = new FormData(form);
    let content = formData.get("content");
    let article_id = postId;
    let date_created = new Date();
    addComment({
      content,
      article_id,
      date_created,
    });
  };
  return (
    <form className="add__comment" onSubmit={handleSubmit}>
      <div className="profil__user">
        <Image
          src={imageAuthor}
          alt={`image couverture de l'article `}
          width={100}
          height={100}
        />
      </div>
      <textarea
        name="content"
        id="content"
        cols="30"
        rows="10"
        placeholder="Votre commentaire ici"
        required
        ref={editorCommentRef}
      ></textarea>
      {/* <ButtonSimple text={"Commenter"} isAwaiting={false} isEnable={true} /> */}
      <ButtonSubmitForm text={"Commenter"} isAwaiting={awaitBtnComment} />
    </form>
  );
};

const SectionContentComments = ({ comments }) => {
  console.log(comments);
  return (
    <div className="container__list__comment__post">
      {comments.map((comment) => (
        <CardComment
          key={comment.comment_id}
          username={comment.users.username}
          date={formatDateTime(comment.date_created)}
          comments={comment.content}
          profilUser={comment.users.profile_picture}
        />
      ))}
    </div>
  );
};

const Container = ({ postId, imageAuthor, nameAuthor }) => {
  const router = useRouter();
  const { data: post, isLoading } = useGetOnePostForAuthor(postId);
  const [awaitingBtnDelete, setAwaitingBtnDelete] = useState(false);
  const { mutate: deletePost } = useMutation(
    (id) => axios.delete(`/api/users/articles?postId=${id}`),
    {
      onSuccess: async (response) => {
        setAwaitingBtnDelete(false);
        toast.success("Votre poste  a été supprimé avec succès.");
        router.push("/myprofil");
      },
      onError: (error) => {
        setAwaitingBtnDelete(false);
        console.error(error);
        toast.error(
          "Échec de la suppresion du poste. Veuillez réessayer ultérieurement."
        );
      },
    }
  );
  console.log(post);
  const handleDeletePost = () => {
    setAwaitingBtnDelete(true);
    deletePost(postId);
  };
  const display = isLoading ? (
    <>
      <SectionPost
        nameAuthor={""}
        imageAuthor={""}
        post={""}
        isLoading={true}
      />
      <SectionAddComment imageAuthor={imageAuthor} isLoading={true} />
    </>
  ) : post === null ? (
    <NotFound message="Oups ! L'article que vous recherchez n'est actuellement pas disponible." />
  ) : (
    <>
      <SectionPost
        nameAuthor={nameAuthor}
        imageAuthor={imageAuthor}
        post={post}
        isLoading={false}
      />
      <div className="controll__action_post">
        <ButtonSimple
          text={"Supprimer l'article"}
          isAwaiting={awaitingBtnDelete}
          isEnable={true}
          eventHandler={handleDeletePost}
        />
      </div>
      <SectionAddComment
        imageAuthor={imageAuthor}
        postId={post.article_id}
        isLoading={false}
      />
      <SectionContentComments comments={post.comments} />
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
    </>
  );
  return display;
};
function UserPost({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const postId = parseInt(params.postId);

  if (status === "loading") {
    return (
      <main className="page__content">
        <LoaderPage />
      </main>
    );
  } else if (status === "authenticated") {
    const { email, name, image } = session.user;

    return (
      <Suspense
        fallback={
          <main className="page__content">
            <LoaderPage />
          </main>
        }
      >
        <main className="page__content">
          <section className="section_page post_details__page">
            <Container
              authorEmail={email}
              postId={postId}
              imageAuthor={image}
              nameAuthor={name}
            />
          </section>
        </main>
      </Suspense>
    );
  } else {
    router.push("/login");
    return (
      <main className="page__content" id="homePage">
        <LoaderPage />
      </main>
    );
  }
}

export default UserPost;
