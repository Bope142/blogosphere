"use client";
import React from "react";
import "./style.scss";
import { CardAuthor } from "@/components/cards/Cards";
import { CardPostSimple } from "@/components/cards/Cards";
import TitleSection from "@/components/titleSection/TitleSection";
import { LoaderPage } from "@/components/loaders/Loaders";
import { useSession } from "next-auth/react";
import { useGetProfilAuthor } from "@/hooks/useAuthor";
import { formatDateTime } from "@/utils/date";
const SectionProfilAuthor = ({ isLoading, profil }) => {
  const display = isLoading ? (
    <div className="content__profil">
      <CardAuthor
        nameAuthor={""}
        profilCover={""}
        overview={""}
        articleCount={0}
        isLoading={true}
      />
    </div>
  ) : (
    <div className="content__profil">
      <CardAuthor
        nameAuthor={profil.username}
        profilCover={profil.profile_picture}
        overview={
          profil.overview === null ? "Aucune présentation 🫡" : profil.overview
        }
        articleCount={profil.articles.length}
        isLoading={false}
        socialMedia={profil.socialmedia}
      />
    </div>
  );
  return display;
};

const SectionPostAuthor = ({ isLoading, data }) => {
  console.log(data);
  const display = isLoading ? (
    <div className="content__post">
      <TitleSection
        title={"TOUS LES ARTICLES DE CET AUTEUR"}
        colorClass={"black"}
        overview={"dernières nouvelles sur la technologie"}
      />
      <div className="list__post">
        {[...Array(8)].map((_, index) => (
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
        ))}
      </div>
    </div>
  ) : (
    <div className="content__post">
      <TitleSection
        title={"TOUS LES ARTICLES DE CET AUTEUR"}
        colorClass={"black"}
        overview={"dernières nouvelles sur la technologie"}
      />
      <div className="list__post">
        {data &&
          data.articles.map((post, index) => (
            <CardPostSimple
              key={index}
              title={post.title}
              category={post.categories.name_categorie}
              cover={post.article_cover}
              duration={post.read_time_minutes}
              postLink={"/articles/" + post.article_id}
              datePost={formatDateTime(post.date_created)}
              isLoading={false}
            />
          ))}
      </div>
    </div>
  );

  return display;
};
function AuthorPage({ params }) {
  const id = parseInt(params.id);
  const { status } = useSession();
  const { data, isLoading } = useGetProfilAuthor(id);
  console.log(data);
  if (status === "loading") {
    return (
      <main className="page__content" id="homePage">
        <LoaderPage />
      </main>
    );
  } else {
    return (
      <main className="page__content">
        <section className="section_page about__page">
          <SectionProfilAuthor isLoading={isLoading} profil={data} />
          <SectionPostAuthor isLoading={isLoading} data={data} />
        </section>
      </main>
    );
  }
}

export default AuthorPage;
