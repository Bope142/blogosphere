import React from "react";
import "./style.scss";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { AiOutlineYoutube } from "react-icons/ai";
import { ButtonIcoLink } from "../buttons/Buttons";
import { FiPhone } from "react-icons/fi";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
function CardCategory({ title, cover }) {
  return (
    <div className="card card__categories">
      <div className="content_cover">
        <Image
          src={cover}
          alt={`image couverture catégorie post ${title}`}
          width={100}
          height={100}
          className="cover__category"
        />
      </div>
      <div className="content">
        <div className="infos">
          <p>{title}</p>
          <Link
            href={"/categories"}
            className="btn-swoh-post-cat btn-clic-effect"
          >
            <GoArrowUpRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
const CardPostSimple = ({
  category,
  title,
  cover,
  duration,
  postLink,
  datePost,
}) => {
  return (
    <Link className="card card__post_simple" href={postLink}>
      <div className="cover">
        <Image
          src={cover}
          alt={`image couverture du post ${title}`}
          width={100}
          height={100}
        />
      </div>
      <div className="details">
        <div className="details-lecture">
          <div className="cat">{category}</div>
          <p className="duration">{duration}</p>
        </div>
        <p className="title__post">{title}</p>
        <p className="post__date">{datePost}</p>
      </div>
    </Link>
  );
};

const CardCirclePost = ({ title, cover, postLink, datePost }) => {
  return (
    <Link href={postLink} className="card card__circle">
      <div className="cover">
        <Image
          src={cover}
          alt={`image couverture du post ${title}`}
          width={100}
          height={100}
        />
      </div>
      <div className="details">
        <p className="title">{title}</p>
        <p className="date">{datePost}</p>
      </div>
    </Link>
  );
};
const CardPostPrincipal = ({ title, cover, postLink }) => {
  return (
    <div className="card card__post__principal">
      <div className="cover">
        <Image
          src={cover}
          alt={`image couverture du post ${title}`}
          width={100}
          height={100}
        />
      </div>
      <div className="details">
        <Link className="title" href={postLink}>
          {title}
        </Link>
      </div>
    </div>
  );
};

const CardPostLarge = ({ title, cover, postLink }) => {
  return (
    <div className="card card__post__large">
      <div className="cover">
        <Image
          src={cover}
          alt={`image couverture du post ${title}`}
          width={100}
          height={100}
        />
      </div>
      <Link className="title" href={postLink}>
        {title}
      </Link>
    </div>
  );
};
const CardPostDefault = ({ title, cover, postLink, category }) => {
  return (
    <div className="card card__post__default">
      <div className="cover">
        <Image
          src={cover}
          alt={`image couverture du post ${title}`}
          width={100}
          height={100}
        />
      </div>
      <div className="details">
        <div className="cat">{category}</div>
        <Link className="title" href={postLink}>
          {title}
        </Link>
      </div>
    </div>
  );
};
const CardProfilAuthor = ({
  nameAuthor,
  profilLink,
  overview,
  profilCover,
}) => {
  return (
    <div className="card__auhtor__profil">
      <div className="card__header">
        <div className="profil">
          <Image
            src={profilCover}
            alt={`image couverture de l'auteur ${nameAuthor}`}
            width={100}
            height={100}
          />
        </div>
        <Link className="btn btn__profil_user" href={profilLink}>
          Profile
        </Link>
      </div>
      <p className="name__author">{nameAuthor}</p>
      <p className="overview">{overview}</p>
    </div>
  );
};

const CardAuthor = ({ nameAuthor, overview, profilCover, articleCount }) => {
  return (
    <div className="container__card__profil__author">
      <div className="profil__cover">
        <Image
          src={profilCover}
          alt={`image couverture de l'auteur ${nameAuthor}`}
          width={100}
          height={100}
        />
      </div>
      <div className="author__details">
        <p className="name__author">{nameAuthor}</p>
        <p className="overview">{overview}</p>
        <div className="articles__count cat">{articleCount} Articles</div>
      </div>
      <div className="social__media">
        <ButtonIcoLink path={""} Icons={<AiOutlineYoutube />} />
        <ButtonIcoLink path={""} Icons={<FaSquareFacebook />} />
        <ButtonIcoLink path={""} Icons={<FaInstagram />} />
        <ButtonIcoLink path={""} Icons={<AiOutlineLinkedin />} />
        <ButtonIcoLink path={""} Icons={<FaGithub />} />
      </div>
    </div>
  );
};
export {
  CardCategory,
  CardPostSimple,
  CardCirclePost,
  CardPostPrincipal,
  CardPostLarge,
  CardPostDefault,
  CardProfilAuthor,
  CardAuthor,
};
