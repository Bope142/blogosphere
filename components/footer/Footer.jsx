import React from "react";
import "./style.scss";
import Link from "next/link";
import { AiOutlineYoutube } from "react-icons/ai";
import { ButtonIcoLink } from "../buttons/Buttons";
import { FiPhone } from "react-icons/fi";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
function Footer() {
  return (
    <footer className="footer section_page">
      <div className="content__footer">
        <div className="box__footer contact">
          <span>CONTACT</span>
          <ul className="content__infos">
            <li className="list__item">
              <ButtonIcoLink path={""} Icons={<AiOutlineYoutube />} />
              <p>irnobert@gmail.com</p>
            </li>
            <li className="list__item">
              <ButtonIcoLink path={""} Icons={<FiPhone />} />
              <p>+243825687549</p>
            </li>
          </ul>
        </div>
        <div className="box__footer social__media">
          <span>SOCIAL MEDIA</span>
          <div className="link__media">
            <ButtonIcoLink path={""} Icons={<AiOutlineYoutube />} />
            <ButtonIcoLink path={""} Icons={<FaSquareFacebook />} />
            <ButtonIcoLink path={""} Icons={<FaInstagram />} />
            <ButtonIcoLink path={""} Icons={<AiOutlineLinkedin />} />
            <ButtonIcoLink path={""} Icons={<FaGithub />} />
          </div>
        </div>
      </div>
      <p className="copyMention">
        © {new Date().getFullYear()}  Blogosophere -Web. Made by{" "}
        <Link href={""}>Norbert Yemuang</Link>
      </p>
    </footer>
  );
}

export default Footer;
