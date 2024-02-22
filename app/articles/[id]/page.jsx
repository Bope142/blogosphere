"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import "./style.scss";
import {
  CardAuthor,
  CardComment,
  CardPostDetails,
} from "@/components/cards/Cards";
import { CardPostSimple } from "@/components/cards/Cards";
import TitleSection from "@/components/titleSection/TitleSection";
import Image from "next/image";

const post = `Before diving into the complexities, it's crucial to acquaint yourself with the building blocks of the language. Begin with greetings, basic phrases, and essential vocabulary. Platforms like Duolingo, Babbel, or Rosetta Stone offer engaging exercises that make learning these fundamentals enjoyable.

Grammar might seem daunting, but fear not! Understanding basic sentence structures, verb conjugations, and noun genders lays a sturdy foundation. Online resources, textbooks, and YouTube tutorials are fantastic aids for grasping grammar intricacies.

Immerse yourself in the language by listening to podcasts, watching Spanish shows or movies, and engaging in conversation with native speakers if possible. Practice speaking aloud, even if it's just to yourself; it helps to solidify pronunciation and confidence.

‍

Progressing Beyond the Basics
Pick up beginner-level books, articles, or children's stories in Spanish. Reading exposes you to new words, sentence structures, and cultural nuances. Don't fret about understanding every word; context is your friend.

Start simple—keep a journal, write short paragraphs, or participate in language exchange forums online. Writing regularly enhances your grasp of grammar and vocabulary while allowing you to express yourself creatively.

Delve into Spanish culture through music, cuisine, art, and traditions. Explore Spanish-speaking countries virtually or in person, if feasible. Understanding cultural nuances adds depth and authenticity to your language learning journey.`;
const SectionPost = () => {
  return (
    <CardPostDetails
      postCover={"/images/tech_cover.png"}
      postTitle={"Les dernières avancées en intelligence artificielle"}
      postCategory={"Technologie et Innovation"}
      profilAuthor={"/images/tech_cover.png"}
      nameAuthor={"Norbert Yemuang"}
      like={12}
      comment={15}
      postText={post}
      postDuration={7}
    />
  );
};

const SectionAddComment = () => {
  return (
    <div className="add__comment">
      <div className="profil__user">
        <Image
          src={"/images/tech_cover.png"}
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

const SectionContentComments = () => {
  return (
    <div className="container__list__comment__post">
      <CardComment
        username={"Nora Bope"}
        date={"12 Dec 2023"}
        comments={"Un bon article merci"}
        profilUser={"/images/tech_cover.png"}
      />
      <CardComment
        username={"Nora Bope"}
        date={"12 Dec 2023"}
        comments={"Un bon article merci"}
        profilUser={"/images/tech_cover.png"}
      />
      <CardComment
        username={"Nora Bope"}
        date={"12 Dec 2023"}
        comments={"Un bon article merci"}
        profilUser={"/images/tech_cover.png"}
      />
      <CardComment
        username={"Nora Bope"}
        date={"12 Dec 2023"}
        comments={"Un bon article merci"}
        profilUser={"/images/tech_cover.png"}
      />
      <CardComment
        username={"Nora Bope"}
        date={"12 Dec 2023"}
        comments={"Un bon article merci"}
        profilUser={"/images/tech_cover.png"}
      />
      <CardComment
        username={"Nora Bope"}
        date={"12 Dec 2023"}
        comments={"Un bon article merci"}
        profilUser={"/images/tech_cover.png"}
      />
    </div>
  );
};
function PostDetailPage() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    console.log(session);
    return (
      <main className="page__content">
        <section className="section_page post_details__page">
          <SectionPost />
          <SectionAddComment />
          <SectionContentComments />
        </section>
      </main>
    );
  } else if (status === "loading") {
    console.log(status);
    return <p>dd</p>;
  } else {
    console.log(status);
    return <p>NON EN LIGNE</p>;
  }
}

export default PostDetailPage;
