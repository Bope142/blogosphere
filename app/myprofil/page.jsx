"use client";
import React from "react";
import "../../public/style/main.scss";
import "./style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  ButtonDefault,
  ButtonSimple,
  ButtonSimpleLink,
} from "@/components/buttons/Buttons";
import { MemoForm } from "@/components/FormControll/FormControll";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { LoaderPage } from "@/components/loaders/Loaders";
import { CardPostSimple } from "@/components/cards/Cards";
const UserProfil = ({ image, name }) => {
  if (image === null) {
    return <p>{name.substring(0, 2).toUpperCase()}</p>;
  } else {
    return (
      <Image
        src={image}
        width={100}
        height={100}
        alt={"photo profile user " + name}
      />
    );
  }
};

const Profil = ({ image, name }) => {
  return (
    <div className="user__cover">
      <div className="cover__bg"></div>
      <div className="content">
        <div className="img-user">
          <UserProfil image={image} name={name} />
        </div>
        <h2>{name}</h2>
        <div className="container__btn__action">
          <ButtonDefault
            text={"Changer la photo"}
            isAwaiting={false}
            isEnable={true}
          />
          <ButtonSimple
            text={"Enregistrer"}
            isAwaiting={false}
            isEnable={true}
          />
          <ButtonSimpleLink
            text={"Pubiler un nouveau article"}
            path={"articles/create"}
          />
        </div>
      </div>
    </div>
  );
};

const UserSocialMediaAccount = () => {
  return (
    <div className="user__account__social_media">
      <span>MEDIA SOCIAUX</span>
      <ul>
        <li>
          <div className="icons_link">
            <AiOutlineYoutube />
          </div>
          <input
            type="link"
            className="input__link"
            value={"http://localhost:3000/authors/5"}
          />
        </li>
        <li>
          <div className="icons_link">
            <FaSquareFacebook />
          </div>
          <input
            type="link"
            className="input__link"
            value={"http://localhost:3000/authors/5"}
          />
        </li>
        <li>
          <div className="icons_link">
            <FaInstagram />
          </div>
          <input
            type="link"
            className="input__link"
            value={"http://localhost:3000/authors/5"}
          />
        </li>
        <li>
          <div className="icons_link">
            <AiOutlineLinkedin />
          </div>
          <input
            type="link"
            className="input__link"
            value={"http://localhost:3000/authors/5"}
          />
        </li>
        <li>
          <div className="icons_link">
            <FaGithub />
          </div>
          <input
            type="link"
            className="input__link"
            value={"http://localhost:3000/authors/5"}
          />
        </li>
      </ul>
      <ButtonSimple text={"Enregistrer"} isAwaiting={false} isEnable={true} />
    </div>
  );
};

const BioUserProfil = ({ overview }) => {
  return (
    <div className="container__bio">
      <MemoForm
        placeholder={"Entrez votre bio ici"}
        labelText={"Votre Bio de profil"}
        name={"msg"}
        defaultValue={overview === null ? "Aucune description " : overview}
      />
      <ButtonSimple text={"Enregistrer"} isAwaiting={false} isEnable={true} />
    </div>
  );
};

const MyProfil = ({ image, name, overview }) => {
  return (
    <section className="section_page profil__infos">
      <Profil name={name} image={image} />
      <BioUserProfil overview={overview} />
      <UserSocialMediaAccount />
    </section>
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
    <section className="section_page content__post">
      <TitleSection
        title={"MES ARTICLES"}
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
    </section>
  );
};

function MyProfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <main className="page__content">
        <LoaderPage />
      </main>
    );
  } else if (status === "authenticated") {
    const { image, name, overview } = session.user;
    return (
      <main className="page__content">
        <MyProfil name={name} image={image} overview={overview} />
        <SectionPostAuthor />
      </main>
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

export default MyProfilPage;
