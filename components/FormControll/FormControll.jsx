"use client";
import React, { useEffect, useState } from "react";
import "./style.scss";
export const InputForm = ({
  type,
  placeholder,
  labelText,
  name,
  isIncorrect,
  id,
  msgError,
  changeMsgState,
  stateName,
}) => {
  const [errorMsg, setErrorMsg] = useState(isIncorrect);
  useEffect(() => {
    setErrorMsg(isIncorrect);
  }, [isIncorrect]);

  return (
    <div className={`input__form_container ${errorMsg ? "invalid-value" : ""}`}>
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required
        onChange={() => {
          if (errorMsg) {
            setErrorMsg(false);
            changeMsgState(false);
          }
        }}
      />
      <p className={`msg-error ${errorMsg && "visible-msg"}`}>{msgError}</p>
    </div>
  );
};

export const MemoForm = ({
  placeholder,
  labelText,
  name,
  defaultValue,
  handleSetRemoteValue,
}) => {
  const [value, setvalue] = useState(defaultValue);
  return (
    <div className="input__form_container">
      <label htmlFor={name}>{labelText}</label>
      <textarea
        name={name}
        id=""
        placeholder={placeholder}
        cols="30"
        rows="10"
        value={value}
        onChange={(e) => {
          setvalue(e.target.value);
          handleSetRemoteValue(e.target.value);
        }}
      ></textarea>
    </div>
  );
};
