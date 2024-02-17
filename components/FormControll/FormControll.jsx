import React from "react";
import "./style.scss";
export const InputForm = ({ type, placeholder, labelText, name }) => {
  return (
    <div className="input__form_container">
      <label htmlFor={name}>{labelText}</label>
      <input type={type} name={name} id="" placeholder={placeholder} />
    </div>
  );
};

export const MemoForm = ({ placeholder, labelText, name }) => {
  return (
    <div className="input__form_container">
      <label htmlFor={name}>{labelText}</label>
      <textarea
        name={name}
        id=""
        placeholder={placeholder}
        cols="30"
        rows="10"
      ></textarea>
    </div>
  );
};
