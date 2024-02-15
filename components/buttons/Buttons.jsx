import Link from "next/link";
import React from "react";
import "./style.scss";
function ButtonSimpleLink({ path, text }) {
  return (
    <Link href={path} className="btn btn-link btn-clic-effect">
      {text}
    </Link>
  );
}

export { ButtonSimpleLink };
