import React from "react";
import "./style.scss";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
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

export { CardCategory };
