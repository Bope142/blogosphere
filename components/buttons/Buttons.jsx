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
const ButtonIcoLink = ({ path, Icons }) => {
  return (
    <Link href={path} className="btn btn-link-icons btn-clic-effect-link">
      {Icons}
    </Link>
  );
};
const ButtonSubmitForm = ({ text, isAwaiting }) => {
  return (
    <button
      type="submit"
      className={`btn btn-link btn-clic-effect ${
        isAwaiting && "btn-awaiting "
      }`}
    >
      {isAwaiting ? <div className="loader-btn"></div> : text}
    </button>
  );
};

export { ButtonSimpleLink, ButtonIcoLink, ButtonSubmitForm };
