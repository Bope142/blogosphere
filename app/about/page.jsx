/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import Image from "next/image";
import "../../public/style/main.scss";
import "./style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { CardProfilAuthor } from "@/components/cards/Cards";
import { ButtonSimpleLink } from "@/components/buttons/Buttons";
import { useGetAuthor } from "@/hooks/useAuthor";
import { LoaderPage } from "@/components/loaders/Loaders";
import { useSession } from "next-auth/react";
import { useGetCategories } from "@/hooks/useCategorie";

const BannerAboutPage = () => {
  return (
    <section className="banner section_page">
      <p>
        Découvrez une multitude de sujets sur notre blog : technologie, cuisine,
        santé, voyages, mode, développement et bien plus!
      </p>
      <div className="cover__banner">
        <Image
          src={"/images/Image post-bro.svg"}
          alt=""
          width={100}
          height={100}
        />
      </div>
    </section>
  );
};

const SectionAuthor = () => {
  const { data, isLoading } = useGetAuthor(5);
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
      <ButtonSimpleLink text={"Voir tous les auteurs"} path={"/authors"} />
    </section>
  );
};

const SectionCategory = () => {
  const { data: categories, isLoading } = useGetCategories();
  const display = !isLoading && (
    <div className="categories__post marquee">
      <div className="marquee-content">
        {categories.map((category, index) => (
          <span key={index}>{category.name_categorie} - </span>
        ))}
      </div>
    </div>
  );

  return display;
};
export default function AboutPage() {
  const { status } = useSession();
  if (status === "loading") {
    return (
      <main className="page__content" id="aboutPage">
        <LoaderPage />
      </main>
    );
  } else {
    return (
      <main className="page__content">
        <BannerAboutPage />
        <SectionCategory />
        <SectionAuthor />
      </main>
    );
  }
}
