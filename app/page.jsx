"use client";
import {
  CardCategory,
  CardCirclePost,
  CardPostDefault,
  CardPostLarge,
  CardPostPrincipal,
  CardPostSimple,
} from "@/components/cards/Cards";
import "../public/style/main.scss";
import "./home.style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { LoaderPage } from "@/components/loaders/Loaders";
import { useSession } from "next-auth/react";
const categories = [
  { title: "Technologie et Innovation", cover: "/images/tech_cover.png" },
  { title: "Voyage et Aventure", cover: "/images/voyage.jpg" },
  { title: "Cuisine et Gastronomie", cover: "/images/Cuisine.jpg" },
  { title: "Art et Culture", cover: "/images/Art.jpg" },
  { title: "Santé et Bien-être", cover: "/images/Sante.jpg" },
  { title: "Mode et Beauté", cover: "/images/Mode.jpg" },
  { title: "Finance et Investissement", cover: "/images/Finance.jpg" },
  {
    title: "Environnement et Durabilité",
    cover: "/images/Environnement.jpg",
  },
  { title: "Parentalité et Éducation", cover: "/images/Education.jpg" },
  { title: "Science et Nature", cover: "/images/Science.jpg" },
  { title: "Sports et Fitness", cover: "/images/Sports.jpg" },
  { title: "Actualités et Politique", cover: "/images/Politique.jpg" },
];
const CategoriePostSection = () => {
  return (
    <section className="section_page content__categorie_post">
      {categories.map((category, index) => (
        <CardCategory
          key={index}
          title={category.title}
          cover={category.cover}
        />
      ))}
    </section>
  );
};

const BestPostSection = () => {
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
    <section className="section_page content__best__post" id="recents__post">
      <TitleSection
        title={"nos derniers contenus"}
        colorClass={"black"}
        overview={
          "Explorez une gamme diversifiée d'articles frais, offrant des perspectives uniques sur des sujets variés"
        }
      />
      <div className="post__best">
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
    </section>
  );
};

const SectionCategory = () => {
  return (
    <div className="categories__post marquee">
      <div className="marquee-content">
        {categories.map((category, index) => (
          <span key={index}>{category.title} - </span>
        ))}
      </div>
    </div>
  );
};

const SectionRandomNewsFirstCategory = () => {
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
  ];
  return (
    <section className="section_page" id="random__first">
      <TitleSection
        title={"TECHNOLOGIE"}
        colorClass={"white"}
        overview={
          "Explorez une gamme diversifiée d'articles frais, offrant des perspectives uniques sur des sujets variés"
        }
      />
      <div className="content__post">
        {posts.map((post, index) => (
          <CardCirclePost
            key={index}
            title={post.title}
            cover={post.cover}
            postLink={post.postLink}
            datePost={post.date}
          />
        ))}
      </div>
    </section>
  );
};

const SectionRandomPostSecondCategory = () => {
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
  ];
  return (
    <section className="section_page" id="random__second">
      <TitleSection
        title={"EDUCATION"}
        colorClass={"black"}
        overview={
          "Explorez une gamme diversifiée d'articles frais, offrant des perspectives uniques sur des sujets variés"
        }
      />
      <div className="content">
        <div className="left__content">
          <CardPostPrincipal
            title={posts[0].title}
            cover={posts[0].cover}
            postLink={posts[0].postLink}
          />
        </div>
        <div className="right__content">
          {posts.map((post, index) => (
            <CardPostLarge
              key={index}
              title={post.title}
              cover={post.cover}
              postLink={post.postLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionRandomPostThirthCategory = () => {
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
      category: "Voyage et Aventure",
      title: "Explorer les merveilles cachées de l'Amérique du Sud",
      cover: "/images/voyage.jpg",
      duration: "7 min",
      postLink: "/article2",
      date: "2024-02-14",
    },
  ];
  return (
    <section className="section_page" id="random__thirth">
      <TitleSection
        title={"POLITIQUE"}
        colorClass={"black"}
        overview={
          "Explorez une gamme diversifiée d'articles frais, offrant des perspectives uniques sur des sujets variés"
        }
      />
      <div className="content">
        {posts.map((post, index) => (
          <CardPostDefault
            key={index}
            title={post.title}
            cover={post.cover}
            postLink={post.postLink}
            category={post.category}
          />
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <main className="page__content" id="homePage">
        <LoaderPage />
      </main>
    );
  } else {
    return (
      <main className="page__content" id="homePage">
        <CategoriePostSection />
        <BestPostSection />
        <SectionCategory />
        <SectionRandomNewsFirstCategory />
        <SectionRandomPostSecondCategory />
        <SectionRandomPostThirthCategory />
      </main>
    );
  }
}
