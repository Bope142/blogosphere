import React from "react";
import "./style.scss";
import Image from "next/image";
import { ButtonSimpleLink } from "../buttons/Buttons";

export default function NotFound({ message }) {
  return (
    <div className="container__not-found">
      <div className="content-img">
        <Image src={"/images/404_error.svg"} width={100} height={100} alt="" />
      </div>
      <p>{message}</p>
      <ButtonSimpleLink text={"Retourner à l'accueil"} path={"/"} />
    </div>
  );
}
