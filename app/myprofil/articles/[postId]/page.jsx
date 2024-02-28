"use client";
import React, { Suspense, useState } from "react";
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
import { ButtonSimple } from "@/components/buttons/Buttons";
import { useGetOnePostForAuthor } from "@/hooks/useArticles";
import { formatDateTime } from "@/utils/date";
import { useMutation } from "react-query";
import axios from "axios";
import NotFound from "@/components/sectionNoFound/404";

const SectionPost = ({ nameAuthor, imageAuthor, post, isLoading }) => {
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
    />
  );
};

const SectionAddComment = ({ imageAuthor, isLoading }) => {
  return isLoading ? (
    <div className="add__comment loading-section-comment">
      <div className="skeleton__loader"></div>
    </div>
  ) : (
    <div className="add__comment">
      <div className="profil__user">
        <Image
          src={imageAuthor}
          alt={`image couverture de l'article `}
          width={100}
          height={100}
        />
      </div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="Votre commentaire ici"
      ></textarea>
      <button className="btn btn-submit-comment btn-link btn-clic-effect">
        Commenter
      </button>
    </div>
  );
};

const SectionContentComments = ({ comments }) => {
  return (
    <div className="container__list__comment__post">
      {comments.map((comment, index) => (
        <CardComment
          key={index}
          username={"Nora Bope"}
          date={formatDateTime(comment.date_created)}
          comments={comment.content}
          profilUser={"/images/tech_cover.png"}
        />
      ))}
    </div>
  );
};

const Container = ({ postId, imageAuthor, nameAuthor }) => {
  const { data: post, isLoading } = useGetOnePostForAuthor(postId);
  const [awaitingBtnDelete, setAwaitingBtnDelete] = useState(false);
  const { mutate: deletePost } = useMutation(
    (id) => axios.delete(`/api/users/articles?postId=${id}`),
    {
      onSuccess: async (response) => {
        console.log(response);
        setAwaitingBtnDelete(false);
        toast.success("Votre poste  a été supprimé avec succès.");
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
      <SectionAddComment imageAuthor={imageAuthor} isLoading={false} />
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
