"use client";
import React, { useState, useRef } from "react";
import "../../../public/style/main.scss";
import "./style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { ButtonSubmitForm } from "@/components/buttons/Buttons";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { LoaderPage } from "@/components/loaders/Loaders";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IoMdImages } from "react-icons/io";
import { ButtonSimple } from "@/components/buttons/Buttons";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetCategories } from "@/hooks/useCategorie";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebaseConfig";

const SectionUploadCover = ({ setCover }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [isFileDropped, setIsFileDropped] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const fileSelectHandler = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg"]; // Types de fichiers autorisés
    const maxSize = 1 * 1024 * 1024; // Taille maximale : 1 MB
    console.log(file);
    if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
        setFileName(file.name);
        setIsFileDropped(true);
        setCover(file);
      };

      reader.readAsDataURL(file);
    } else {
      toast.warn(
        "Veuillez sélectionner une image au format PNG ou JPEG, inférieure à 1 MB."
      );
      fileInputRef.current.value = "";
      setIsFileDropped(false);
      setFileName("");
      setPreviewUrl("");
      setCover(null);
    }
  };

  const browseFile = () => {
    fileInputRef.current.click();
    console.log("object");
  };

  const dropHandler = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const allowedTypes = ["image/png", "image/jpeg"]; // Types de fichiers autorisés
    const maxSize = 1 * 1024 * 1024; // Taille maximale : 1 MB
    console.log(file);
    if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
        setFileName(file.name);
        setIsFileDropped(true);
        setCover(file);
      };

      reader.readAsDataURL(file);
    } else {
      toast.warn(
        "Veuillez sélectionner une image au format PNG ou JPEG, inférieure à 1 MB."
      );
      fileInputRef.current.value = "";
      setIsFileDropped(false);
      setFileName("");
      setPreviewUrl("");
      setCover(null);
    }
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
    setIsFileDropped(true);
  };

  const dragLeaveHandler = (event) => {
    setIsFileDropped(false);
  };
  const clearFile = () => {
    fileInputRef.current.value = "";
    setIsFileDropped(false);
    setFileName("");
    setPreviewUrl("");
    setCover(null);
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={fileSelectHandler}
        accept="image/png, image/jpeg,  image/jpg"
      />
      <div
        className={`upload__section ${
          fileName === "" ? " no-uploaded" : "is-uploaded"
        }`}
      >
        {fileName === "" ? (
          <div
            className={`no__cover${isFileDropped ? " dropped-file" : ""}`}
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
          >
            <div className="box-img">
              <IoMdImages />
            </div>

            <span class="text">
              faites glisser et déposez la photo de couverture ici
            </span>
            <span class="text-two">OU</span>
            <ButtonSimple
              text={"Parcourir"}
              isAwaiting={false}
              isEnable={true}
              eventHandler={browseFile}
            />
          </div>
        ) : (
          <div className="image__upload is-uploaded">
            <div className="cover__img">
              <Image src={previewUrl} alt="" width={100} height={100} />
            </div>
            <div className="selected__pictures">
              <p>{fileName}</p>
              <ButtonSimple
                text={"Supprimer"}
                isAwaiting={false}
                isEnable={true}
                eventHandler={clearFile}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const FormCreatePost = ({ email, name }) => {
  const { data: categories, isFetching } = useGetCategories();
  const [coverArticle, setcoverArticle] = useState(null);

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

  const uploadArticleCover = async (file) => {
    try {
      function generateUniqueCoverPhotoName() {
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 8);
        const uniqueName = `cover_${timestamp}_${randomString}`;
        return uniqueName;
      }

      if (file === null) {
        return "/images/categories_cover/art.jpg";
      } else {
        let filename = generateUniqueCoverPhotoName();

        const storageRef = ref(storage, `articles/${filename}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      toast.error("Erreur lors du téléchargement du fichier...");
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let title = formData.get("title");
    let readTimeMinutes = formData.get("read_time_minutes");
    let categoryId = parseInt(formData.get("category_id"));
    if (categoryId < 1) {
      toast.warn("Veuillez choisir une catégorie");
    } else {
      const urlCoverArticle = await uploadArticleCover(coverArticle);
      if (urlCoverArticle !== null) {
        console.log(...formData);
      }
    }
  };
  return (
    <main className="page__content">
      <section className="section_page content">
        <TitleSection
          title={"Publier un article"}
          colorClass={"black"}
          overview={"Partagez un post avec la communauté"}
        />
        <form onSubmit={handleSubmit}>
          <SectionUploadCover setCover={setcoverArticle} />
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Titre de l'article"
            required
          />

          <select name="category_id" id="category_id" required>
            <option value="-1">Choisisez une catégorie</option>
            {!isFetching &&
              categories.map((category, index) => (
                <option key={index} value={category.category_id}>
                  {category.name_categorie}
                </option>
              ))}
          </select>

          <input
            type="number"
            name="read_time_minutes"
            id="read_time_minutes"
            placeholder="Estimation temps de lecture... Ex: 5 MIN"
            required
          />
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
};
function PageCreatePost() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <main className="page__content">
        <LoaderPage />
      </main>
    );
  } else if (status === "authenticated") {
    const { email, name } = session.user;

    return <FormCreatePost email={email} name={name} />;
  } else {
    router.push("/login");
    return (
      <main className="page__content" id="homePage">
        <LoaderPage />
      </main>
    );
  }
}

export default PageCreatePost;
