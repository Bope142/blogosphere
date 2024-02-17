import React from "react";
import "./style.scss";
function TitleSection({ title, overview, colorClass }) {
  return (
    <div className={"title__section " + colorClass}>
      <span className="title">{title}</span>
      <p className="overview">{overview}</p>
    </div>
  );
}

export default TitleSection;
