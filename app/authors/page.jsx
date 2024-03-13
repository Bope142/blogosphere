/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import "../../public/style/main.scss";
import "./style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { CardProfilAuthor } from "@/components/cards/Cards";
import { useGetAllProfilAuthor } from "@/hooks/useAuthor";
import { LoaderPage } from "@/components/loaders/Loaders";
import { useSession } from "next-auth/react";

const SectionAuthor = () => {
  const { data, isLoading } = useGetAllProfilAuthor();
  return (
    <section className="section_page list__author">
      <TitleSection
        title={"AUTEURS"}
        colorClass={"black"}
        overview={"Les voix derrière nos pages"}
      />
      <div className="content__profil_author">
        {isLoading
          ? [...Array(8)].map((_, index) => (
              <CardProfilAuthor
                key={index}
                profilCover={""}
                nameAuthor={""}
                overview={""}
                profilLink={""}
                isLoading={true}
              />
            ))
          : data.map((author) => (
              <CardProfilAuthor
                key={author.user_id}
                profilCover={author.profile_picture}
                nameAuthor={author.username}
                overview={
                  author.overview === null
                    ? "Aucune présentation 🫡"
                    : author.overview
                }
                profilLink={"/authors/" + author.user_id}
                isLoading={false}
              />
            ))}
      </div>
    </section>
  );
};

export default function AuthorPage() {
  const { status } = useSession();
  if (status === "loading") {
    return (
      <main className="page__content" id="authorPage">
        <LoaderPage />
      </main>
    );
  } else {
    return (
      <main className="page__content">
        <SectionAuthor />
      </main>
    );
  }
}
