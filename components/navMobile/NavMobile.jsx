"use client";
import React from "react";
import "./style.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonSimpleLink } from "../buttons/Buttons";

const ProfilStatut = () => {
  return (
    <div className="profil_user">
      <Link href={"/login"} className="simple_link">
        Se connecter
      </Link>
      <ButtonSimpleLink path={"/signup"} text={"S'inscrire"} />
    </div>
  );
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
