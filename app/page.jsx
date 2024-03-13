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
import { useGetCategories } from "@/hooks/useCategorie";
import { useGetLastPost } from "@/hooks/useArticles";
import { Chela_One } from "next/font/google";
import { formatDateTime } from "@/utils/date";

const CategoriePostSection = () => {
  const { data: categories, isFetching } = useGetCategories();

  const display = isFetching ? (
    <section className="section_page content__categorie_post">
      {[...Array(8)].map((_, index) => (
        <CardCategory key={index} title={""} cover={""} id={0} loading={true} />
      ))}
    </section>
  ) : (
    <section className="section_page content__categorie_post">
      {categories.map((category, index) => (
        <CardCategory
          key={index}
          title={category.name_categorie}
          cover={category.coverPath}
          id={category.category_id}
          loading={false}
        />
      ))}
    </section>
  );
  return display;
};

const BestPostSection = () => {
  const { data: posts, isFetching } = useGetLastPost();
  console.log(posts);
  const display = isFetching ? (
    <section className="section_page content__best__post" id="recents__post">
      <TitleSection
        title={"nos derniers contenus"}
        colorClass={"black"}
        overview={
          "Explorez une gamme diversifiée d'articles frais, offrant des perspectives uniques sur des sujets variés"
        }
      />
      <div className="post__best">
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
    </section>
  ) : (
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
      </div>
    </section>
  );
  return display;
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
  const { status } = useSession();
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
