"use client";
import React, { Suspense } from "react";
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
import { ButtonSimpleLink } from "@/components/buttons/Buttons";

const post = `Before diving into the complexities, it's crucial to acquaint yourself with the building blocks of the language. Begin with greetings, basic phrases, and essential vocabulary. Platforms like Duolingo, Babbel, or Rosetta Stone offer engaging exercises that make learning these fundamentals enjoyable.

Grammar might seem daunting, but fear not! Understanding basic sentence structures, verb conjugations, and noun genders lays a sturdy foundation. Online resources, textbooks, and YouTube tutorials are fantastic aids for grasping grammar intricacies.

Immerse yourself in the language by listening to podcasts, watching Spanish shows or movies, and engaging in conversation with native speakers if possible. Practice speaking aloud, even if it's just to yourself; it helps to solidify pronunciation and confidence.

‍

Progressing Beyond the Basics
Pick up beginner-level books, articles, or children's stories in Spanish. Reading exposes you to new words, sentence structures, and cultural nuances. Don't fret about understanding every word; context is your friend.

Start simple—keep a journal, write short paragraphs, or participate in language exchange forums online. Writing regularly enhances your grasp of grammar and vocabulary while allowing you to express yourself creatively.

Delve into Spanish culture through music, cuisine, art, and traditions. Explore Spanish-speaking countries virtually or in person, if feasible. Understanding cultural nuances adds depth and authenticity to your language learning journey.`;
const SectionPost = ({ post }) => {
  return (
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

const Container = ({ postId, imageAuthor }) => {
  const { data: post, isLoading } = useGetOnetPost(postId);
  console.log(post);
  const display = isLoading ? (
    "Fetched"
  ) : (
    <>
      <SectionPost post={post} />
      <SectionAddComment imageAuthor={imageAuthor} />
      <SectionContentComments comments={post.comments} />
    </>
  );
  return display;
};

const ContainerNoSession = ({ postId }) => {
  const { data: post, isLoading } = useGetOnetPost(postId);
  console.log(post);
  const display = isLoading ? (
    "Fetched"
  ) : (
    <>
      <SectionPost post={post} />
      <SectionContentComments comments={post.comments} />
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
        </main>
      </Suspense>
    );
  }
}

export default PostDetailPage;
