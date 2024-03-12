"use client";
import React, { Suspense, useState, useRef } from "react";
import TitleSection from "@/components/titleSection/TitleSection";
import { LoaderPage } from "@/components/loaders/Loaders";
import { CardPostSimple } from "@/components/cards/Cards";
import "./style.scss";
import { useGetAllPostFromCategory } from "@/hooks/useArticles";
import { formatDateTime } from "@/utils/date";
import { useSession } from "next-auth/react";
import NotFound from "@/components/sectionNoFound/404";

const ContainerPost = ({ isLoading, posts }) => {
  const display = isLoading ? (
    <>
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
    </>
  ) : (
    <>
      {posts.map((post, index) => (
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
    </>
  );
  return display;
};

function PostCategorie({ params }) {
  const { status } = useSession();

  const idCategorie = parseInt(params.idCategorie);
  const { data: posts, isLoading } = useGetAllPostFromCategory(
    parseInt(idCategorie)
  );
  if (status === "loading") {
    return (
      <main className="page__content" id="homePage">
        <LoaderPage />
      </main>
    );
  } else {
    return (
      <main className="section_page ">
        {posts && posts.length === 0 ? (
          <NotFound
            message={
              "Oops! Aucun articles  trouvé correspondant à cette catégorie. Veuillez réessayer avec des termes différents ou explorer nos autres options disponibles. Merci!"
            }
          />
        ) : (
          !isLoading && (
            <>
              <TitleSection
                title={posts[0].categories.name_categorie}
                colorClass={"black"}
                overview={`Explorez une gamme diversifiée d'articles frais, offrant des perspectives uniques sur des sujets variés sur ${posts[0].categories.name_categorie}`}
              />
              <section className="content__post">
                <ContainerPost isLoading={isLoading} posts={posts} />
              </section>
            </>
          )
        )}
      </main>
    );
  }
}

export default PostCategorie;
