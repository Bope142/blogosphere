"use client";
import React, { useState } from "react";
import "./style.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonSimpleLink } from "../buttons/Buttons";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";

const ProfilPicture = ({ username, profilPath }) => {
  if (profilPath === null) {
    return (
      <Link href={"/myprofil"} className="profil__picture__users no-pic">
        <p>{username.substring(0, 2).toUpperCase()}</p>
      </Link>
    );
  } else {
    return (
      <Link href={"/myprofil"} className="profil__picture__users with-pic">
        <Image
          src={profilPath}
          width={100}
          height={100}
          alt={"photo profile user " + username}
        />
      </Link>
    );
  }
};

const HeaderProfilStatut = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="header__profil_user connect-user">
        <ProfilPicture
          username={session.user.name}
          profilPath={session.user.image}
        />
        <button
          className="btn btn-logout btn-link "
          onClick={() => {
            signOut({ callbackUrl: "http://localhost:3000/login" });
          }}
          title="se déconnecter"
        >
          <IoIosLogOut />
        </button>
      </div>
    );
  } else {
    return (
      <div className="header__profil_user">
        <Link href={"/login"} className="simple_link">
          Se connecter
        </Link>
        <ButtonSimpleLink path={"/signup"} text={"S'inscrire"} />
      </div>
    );
  }
};
const HeaderNav = () => {
  const pathname = usePathname();
  const navLinks = [
    { title: "Accueil", path: "/" },
    { title: "À propos", path: "/about" },
    { title: "Catégories", path: "/categories" },
    { title: "ARTICLES", path: "/articles" },
    { title: "Contact", path: "/contact" },
  ];
  return (
    <nav className="header__nav">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          passHref
          className={
            pathname === link.path ? "active-item-nav nav__item" : " nav__item"
          }
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};
const HeaderLogo = () => {
  return (
    <div className="header__logo" onClick={() => signOut()}>
      <svg
        width="129"
        height="130"
        viewBox="0 0 129 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M119.594 19.3125C78.784 19.3125 49.035 28.6445 31.1739 47.0431C15.7315 62.9507 14.8233 79.9875 14.7917 83.2351C14.7914 83.2603 14.7918 83.2746 14.7917 83.2981C7.36745 93.1203 4.87708 101.392 3.51151 106.042C3.28576 106.813 3.08819 107.49 2.89738 108.068C2.19325 110.181 3.33078 112.469 5.44315 113.17C5.86509 113.313 6.29673 113.375 6.71867 113.375C8.40642 113.375 9.98352 112.307 10.5452 110.619C10.7629 109.963 10.9879 109.188 11.2486 108.31C12.5789 103.781 14.744 96.4512 21.3687 87.7545L21.3739 87.7492C21.3681 87.7495 21.3692 87.7489 21.3634 87.7492L14.8232 83.2561C15.056 82.9485 15.2838 82.6428 15.5265 82.3322C16.368 81.2555 17.2256 80.1718 18.193 79.0621C24.6408 71.6656 34.001 63.6016 47.7555 55.62C47.9879 55.4847 48.2327 55.3507 48.4694 55.2158C48.9992 54.914 49.5264 54.6086 50.0651 54.3077C50.6479 53.9816 51.2204 53.6571 51.8183 53.3314C52.6621 52.8718 53.5352 52.4157 54.4113 51.9562C54.9841 51.6559 55.5416 51.353 56.1277 51.0533C57.1248 50.5454 58.1637 50.0391 59.1984 49.5311C59.7023 49.2843 60.1863 49.0373 60.6996 48.791C62.2691 48.0385 63.8758 47.2915 65.534 46.5444C67.5577 45.6307 69.9507 46.5335 70.8617 48.5653C71.7755 50.5944 70.8726 52.9793 68.8409 53.8931C65.7154 55.2995 62.7817 56.7093 59.9963 58.1238C59.9656 58.1393 59.9375 58.1555 59.907 58.171C59.6936 58.2795 59.4939 58.3879 59.2824 58.4964C50.9707 62.7618 44.1388 67.0459 38.5225 71.2306C38.3885 71.3304 38.2562 71.43 38.1236 71.5298C30.5701 77.2096 25.2135 82.7085 21.3739 87.7492C31.3196 87.236 68.511 83.8353 96.7132 61.3099C98.1859 60.1328 98.6485 58.0874 97.8207 56.3916L95.2277 51.0743L105.364 51.3578C106.565 51.4142 107.741 50.8781 108.534 49.9563C114.941 42.5119 119.93 34.028 123.373 24.74C123.83 23.5091 123.656 22.1251 122.901 21.0447C122.148 19.9589 120.913 19.3125 119.594 19.3125ZM64.29 56.0084C63.8089 56.2395 63.3562 56.4676 62.8832 56.696C63.3535 56.4649 63.8089 56.2395 64.29 56.0084ZM36.1342 73.0572C35.8547 73.2776 35.571 73.5009 35.2996 73.7186C35.571 73.4982 35.8547 73.2749 36.1342 73.0572Z"
          fill="#FF3131"
        />
      </svg>

      <h1>BLOGOSPHERE</h1>
    </div>
  );
};

const ButtonMenuMobile = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className={`btn btn-menu btn-clic-effect ${isActive && "active"}`}
      onClick={() => {
        setIsActive(!isActive);
        document
          .querySelector(".nav__mobile")
          .classList.toggle("nav__mobile_show");
      }}
    >
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </button>
  );
};

function Header() {
  return (
    <header className="container__header">
      <div className="content">
        <div className="nav__large_screen">
          <HeaderLogo />
          <HeaderNav />
          <HeaderProfilStatut />
          <ButtonMenuMobile />
        </div>
      </div>
    </header>
  );
}

export default Header;
