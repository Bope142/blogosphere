"use client";
import React, { useState } from "react";
import "../../../public/style/main.scss";
import "./style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { ButtonSubmitForm } from "@/components/buttons/Buttons";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

function PageCreatePost() {
  const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });
  const [content, setContent] = useState("");
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent) => {
    //setContent(newContent);
  };
  return (
    <main className="page__content">
      <section className="section_page content">
        <TitleSection
          title={"Publier un article"}
          colorClass={"black"}
          overview={"Partagez un post avec la communauté"}
        />
        <form
          action="
        "
        >
          <input type="text" name="" id="" placeholder="Titre de l'article" />
          <select name="" id="">
            <option value="1">Choisisez une catégorie</option>
            <option value="1">Tech</option>
            <option value="1">Tech</option>
            <option value="1">Tech</option>
            <option value="1">Tech</option>
          </select>
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-[70%] mt-10 bg-white"
          />
          <ButtonSubmitForm text={"Publier "} />
        </form>
      </section>
    </main>
  );
}

export default PageCreatePost;
