import React from "react";
import "./style.scss";
import { CardAuthor } from "@/components/cards/Cards";
import { CardPostSimple } from "@/components/cards/Cards";
import TitleSection from "@/components/titleSection/TitleSection";

const SectionProfilAuthor = () => {
  return (
    <div className="content__profil">
      <CardAuthor
        nameAuthor={"Norbert Yemuang"}
        profilCover={"/images/tech_cover.png"}
        overview={
          "Environnementaliste dévoué, Alex met en lumière les problèmes écologiques urgents et les pratiques de développement durable. Ses articles incitent à l’action et offrent des idées pratiques pour un avenir plus vert."
        }
        articleCount={12}
      />
    </div>
  );
};

const SectionPostAuthor = () => {
  const posts = [
    {
      category: "Technologie et Innovation",
      title: "Les dernières avancées en intelligence artificielle",
      cover: "/images/tech_cover.png",
      duration: "5 min",
      postLink: "/article1",
      date: "2024-02-15",
    },
    {
      category: "Voyage et Aventure",
      title: "Explorer les merveilles cachées de l'Amérique du Sud",
      cover: "/images/voyage.jpg",
      duration: "7 min",
      postLink: "/article2",
      date: "2024-02-14",
    },
    {
      category: "Cuisine et Gastronomie",
      title:
        "Recettes traditionnelles de cuisine française à essayer à la maison",
      cover: "/images/Cuisine.jpg",
      duration: "10 min",
      postLink: "/article3",
      date: "2024-02-13",
    },
    {
      category: "Art et Culture",
      title: "Analyse de l'impact de la Renaissance sur l'art moderne",
      cover: "/images/Art.jpg",
      duration: "6 min",
      postLink: "/article4",
      date: "2024-02-12",
    },
    {
      category: "Santé et Bien-être",
      title: "Les bienfaits du yoga pour la santé mentale et physique",
      cover: "/images/Sante.jpg",
      duration: "8 min",
      postLink: "/article5",
      date: "2024-02-11",
    },
    {
      category: "Mode et Beauté",
      title: "Les tendances de la mode printemps-été à adopter cette année",
      cover: "/images/Mode.jpg",
      duration: "9 min",
      postLink: "/article6",
      date: "2024-02-10",
    },
    {
      category: "Finance et Investissement",
      title: "Comment commencer à investir en bourse avec succès",
      cover: "/images/Finance.jpg",
      duration: "5 min",
      postLink: "/article7",
      date: "2024-02-09",
    },
    {
      category: "Environnement et Durabilité",
      title:
        "Les initiatives pour sauver notre planète et lutter contre le changement climatique",
      cover: "/images/Environnement.jpg",
      duration: "7 min",
      postLink: "/article8",
      date: "2024-02-08",
    },
    {
      category: "Parentalité et Éducation",
      title: "Naviguer à travers les défis de la parentalité moderne",
      cover: "/images/Education.jpg",
      duration: "12 min",
      postLink: "/article9",
      date: "2024-02-07",
    },
    {
      category: "Science et Nature",
      title: "Les découvertes scientifiques les plus fascinantes de l'année",
      cover: "/images/Science.jpg",
      duration: "8 min",
      postLink: "/article10",
      date: "2024-02-06",
    },
    {
      category: "Sports et Fitness",
      title:
        "Les meilleures techniques d'entraînement pour améliorer vos performances sportives",
      cover: "/images/Sports.jpg",
      duration: "6 min",
      postLink: "/article11",
      date: "2024-02-05",
    },
    {
      category: "Actualités et Politique",
      title:
        "Analyse des enjeux politiques mondiaux et de leur impact sur la société",
      cover: "/images/Politique.jpg",
      duration: "7 min",
      postLink: "/article12",
      date: "2024-02-04",
    },
  ];
  return (
    <div className="content__post">
      <TitleSection
        title={"TOUS LES ARTICLES DE CET AUTEUR"}
        colorClass={"black"}
        overview={"dernières nouvelles sur la technologie"}
      />
      <div className="list__post">
        {posts.map((post, index) => (
          <CardPostSimple
            key={index}
            title={post.title}
            category={post.category}
            cover={post.cover}
            duration={post.duration}
            postLink={post.postLink}
            datePost={post.date}
          />
        ))}
      </div>
    </div>
  );
};
function AuthorPage() {
  return (
    <main className="page__content">
      <section className="section_page about__page">
        <SectionProfilAuthor />
        <SectionPostAuthor />
      </section>
    </main>
  );
}

export default AuthorPage;
