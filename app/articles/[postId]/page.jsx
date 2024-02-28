"use client";
import React, { Suspense, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import "./style.scss";
import { useRouter } from "next/navigation";
import {
  CardAuthor,
  CardComment,
  CardPostDetails,
} from "@/components/cards/Cards";
import { CardPostSimple } from "@/components/cards/Cards";
import TitleSection from "@/components/titleSection/TitleSection";
import Image from "next/image";
import { LoaderPage } from "@/components/loaders/Loaders";
import { useGetOnetPost } from "@/hooks/useArticles";
import {
  ButtonSimple,
  ButtonSimpleLink,
  ButtonSubmitForm,
} from "@/components/buttons/Buttons";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDateTime } from "@/utils/date";

const SectionPost = ({ post, isLoading }) => {
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
      profilAuthor={post.users.profile_picture}
      nameAuthor={post.users.username}
      like={post.likes.length}
      comment={post.comments.length}
      postText={post.content}
      postDuration={post.read_time_minutes}
      postDateTime={post.date_created}
      isLoading={isLoading}
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
        queryClient.invalidateQueries("onePost", postId);
        setAwaitBtnComment(false);
        console.log(response);
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

const SectionContentComments = ({ comments, isLoading }) => {
  console.log(comments);

  return isLoading ? (
    <div className="container__list__comment__post loading_section_comment">
      <div className="skeleton__loader"></div>
    </div>
  ) : (
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

const Container = ({ postId, imageAuthor }) => {
  const { data: post, isLoading } = useGetOnetPost(postId);

  const display = isLoading ? (
    <>
      <SectionPost post={post} isLoading={true} />
      <SectionContentComments comments={post} isLoading={true} />
    </>
  ) : (
    <>
      <SectionPost post={post} isLoading={false} />
      <SectionAddComment imageAuthor={imageAuthor} postId={postId} />
      <SectionContentComments comments={post.comments} />
    </>
  );
  return display;
};

const ContainerNoSession = ({ postId }) => {
  const { data: post, isLoading } = useGetOnetPost(postId);
  const display = isLoading ? (
    <>
      <SectionPost post={post} isLoading={true} />
      <SectionContentComments comments={post} isLoading={true} />
    </>
  ) : (
    <>
      <SectionPost post={post} isLoading={false} />
      <SectionContentComments comments={post.comments} isLoading={false} />
      <div className="no-connected">
        <p>
          Pour pouvoir aimer ou commenter cette publication, veuillez vous
          connecter à votre compte utilisateur
        </p>
        <ButtonSimpleLink path={"/login"} text={"Se connecter"} />
      </div>
    </>
  );
  return display;
};
function PostDetailPage({ params }) {
  const { data: session, status } = useSession();
  const postId = parseInt(params.postId);
  console.log(params);
  const router = useRouter();
  if (status === "loading") {
    return (
      <main className="page__content">
        <LoaderPage />
      </main>
    );
  } else if (status === "authenticated") {
    const { image, name, overview, email } = session.user;
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
          </section>
        </main>
      </Suspense>
    );
  } else {
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
            <ContainerNoSession postId={postId} />
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
      </Suspense>
    );
  }
}

export default PostDetailPage;
