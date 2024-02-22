"use client";
import React from "react";
import "./style.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonSimpleLink } from "../buttons/Buttons";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
const ProfilStatut = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    console.log(session);
    return (
      <div className="profil_user connect-user">
        <ProfilPicture
          username={session.user.name}
          profilPath={session.user.image}
        />
      </div>
    );
  } else {
    return (
      <div className="profil_user">
        <Link href={"/login"} className="simple_link">
          Se connecter
        </Link>
        <ButtonSimpleLink path={"/signup"} text={"S'inscrire"} />
      </div>
    );
  }
};

function NavMobile() {
  const pathname = usePathname();
  const navLinks = [
    { title: "Accueil", path: "/" },
    { title: "À propos", path: "/about" },
    { title: "Catégories", path: "/categories" },
    { title: "ARTICLES", path: "/articles" },
    { title: "Contact", path: "/contact" },
  ];
  return (
    <div className="nav__mobile">
      <div className="link__nav">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            passHref
            className={
              pathname === link.path
                ? "active-item nav__item__mobile"
                : " nav__item__mobile"
            }
          >
            {link.title}
          </Link>
        ))}
      </div>
      <ProfilStatut />
    </div>
  );
}

export default NavMobile;
