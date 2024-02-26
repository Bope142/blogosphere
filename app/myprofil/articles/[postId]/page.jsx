"use client";
import React, { Suspense } from "react";
import { LoaderPage } from "@/components/loaders/Loaders";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "./style.scss";

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

const SectionPost = ({ nameAuthor, imageAuthor, post }) => {
  return (
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
    />
  );
};

const SectionAddComment = ({ imageAuthor }) => {
  return (
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

const Container = ({ authorEmail, postId, imageAuthor, nameAuthor }) => {
  const { data: post, isLoading } = useGetOnePostForAuthor(authorEmail, postId);
  console.log(post);
  const display = isLoading ? (
    "Fetched"
  ) : (
    <>
      <SectionPost
        nameAuthor={nameAuthor}
        imageAuthor={imageAuthor}
        post={post}
      />
      <div className="controll__action_post">
        <ButtonSimple
          text={"Supprimer l'article"}
          isAwaiting={false}
          isEnable={true}
        />
      </div>
      <SectionAddComment imageAuthor={imageAuthor} />
      <SectionContentComments comments={post.comments} />
    </>
  );
  return display;
};
function UserPost({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const postId = parseInt(params.postId);
  console.log(postId);
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
