"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import "../../public/style/main.scss";
import "./style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  ButtonDefault,
  ButtonSimple,
  ButtonSimpleLink,
} from "@/components/buttons/Buttons";
import { storage } from "@/lib/firebaseConfig";
import { MemoForm } from "@/components/FormControll/FormControll";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { LoaderPage } from "@/components/loaders/Loaders";
import { CardPostSimple } from "@/components/cards/Cards";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetPersonnalPost } from "@/hooks/useArticles";
import { formatDateTime } from "@/utils/date";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const isFirebaseStorageURL = (url) => {
  const firebaseStorageRegex =
    /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/blogospher\.appspot\.com\/.+/;
  return firebaseStorageRegex.test(url);
};

const deleteProfilPictureFromFirebase = async (fileUrl) => {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error deleting file: ", error);
  }
};
const UserProfil = ({ image, name }) => {
  if (!image) {
    return <p>{name.substring(0, 2).toUpperCase()}</p>;
  } else if (typeof image === "string") {
    return (
      <Image
        src={image}
        width={100}
        height={100}
        alt={"photo profile user " + name}
      />
    );
  } else {
    return (
      <Image
        src={URL.createObjectURL(image)}
        width={100}
        height={100}
        alt={"photo profile user " + name}
      />
    );
  }
};

const Profil = ({ image, name }) => {
  const [selectedImage, setSelectedImage] = useState(image);
  const [awaitBtnSave, setAwaitBtnSave] = useState(false);
  const [enableBtnSave, setEnableBtnSave] = useState(false);
  const fileInputRef = useRef(null);
  const [refFileUpload, setRefFileUpload] = useState(null);
  const { mutate: updateProfilPicture } = useMutation(
    (urlProfil) => axios.put("/api/users/profil", urlProfil),
    {
      onSuccess: async (response) => {
        const urlOlderProfil = image;
        setSelectedImage(response.data);
        setAwaitBtnSave(false);
        setEnableBtnSave(false);
        toast.success("La photo de profil a été mise à jour avec succès !");

        if (isFirebaseStorageURL(urlOlderProfil)) {
          deleteProfilPictureFromFirebase(urlOlderProfil);
        }
      },
      onError: async (error) => {
        setSelectedImage(image);
        await deleteObject(refFileUpload);
        setAwaitBtnSave(false);
        setEnableBtnSave(false);
        console.error(error);
        toast.error(
          "Échec de la modification de la photo de profil. Veuillez réessayer ultérieurement."
        );
      },
    }
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setEnableBtnSave(true);
  };

  const handleUploadImage = async () => {
    try {
      if (selectedImage) {
        setAwaitBtnSave(true);
        const imageUrl = await uploadImage(selectedImage);
        updateProfilPicture({
          urlProfil: imageUrl,
        });
      } else {
        setAwaitBtnSave(false);
        setEnableBtnSave(false);
        toast.warn("Aucune photo séléctionnée !");
      }
    } catch (error) {
      setAwaitBtnSave(false);
      setEnableBtnSave(false);
      console.error("Error uploading image: ", error);
    }
  };

  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, `profil/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setRefFileUpload(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file: ", error);
      setAwaitBtnSave(false);
      setEnableBtnSave(false);
      throw error;
    }
  };
  return (
    <div className="user__cover">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <div className="cover__bg"></div>
      <div className="content">
        <div className="img-user">
          <UserProfil image={selectedImage} name={name} />
        </div>
        <h2>{name}</h2>
        <div className="container__btn__action">
          <ButtonDefault
            text={"Changer la photo"}
            isAwaiting={false}
            isEnable={true}
            eventHandler={() => fileInputRef.current.click()}
          />
          <ButtonSimple
            text={"Enregistrer"}
            isAwaiting={awaitBtnSave}
            isEnable={enableBtnSave}
            eventHandler={handleUploadImage}
          />
          <ButtonSimpleLink
            text={"Pubiler un nouveau article"}
            path={"articles/create"}
          />
        </div>
      </div>
    </div>
  );
};

const UserSocialMediaAccount = ({ socialMedia }) => {
  const [youtube, setYoutube] = useState(
    socialMedia !== undefined ? socialMedia[0].link : "No Link provided"
  );
  const [facebook, setFacebook] = useState(
    socialMedia !== undefined ? socialMedia[1].link : "No Link provided"
  );
  const [instagram, setInstagram] = useState(
    socialMedia !== undefined ? socialMedia[2].link : "No Link provided"
  );
  const [linkedin, setLinkedin] = useState(
    socialMedia !== undefined ? socialMedia[4].link : "No Link provided"
  );
  const [github, setGithub] = useState(
    socialMedia !== undefined ? socialMedia[3].link : "No Link provided"
  );
  const [awaitBtnSave, setAwaitBtnSave] = useState(false);
  const { mutate: saveNewSocialMedia } = useMutation(
    (socialMedia) => axios.post("/api/users/socialmedia", socialMedia),
    {
      onSuccess: async (response) => {
        setAwaitBtnSave(false);
        toast.success(
          "Vos informations sur les réseaux sociaux ont été mises à jour avec succès."
        );
      },
      onError: (error) => {
        setAwaitBtnSave(false);
        toast.error(
          "Échec de la modification de vos informations sur les réseaux sociaux. Veuillez réessayer ultérieurement."
        );
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "youtube":
        setYoutube(value);
        break;
      case "facebook":
        setFacebook(value);
        break;
      case "instagram":
        setInstagram(value);
        break;
      case "linkedin":
        setLinkedin(value);
        break;
      case "github":
        setGithub(value);
        break;
      default:
        break;
    }
  };

  const setDefaultAndCheckURL = (formData) => {
    function isValidURL(url) {
      const regex = /^(http|https):\/\/[^ "]+$/;
      return regex.test(url);
    }

    const validYoutube =
      youtube && isValidURL(youtube) ? youtube : "No link provided";
    const validFacebook =
      facebook && isValidURL(facebook) ? facebook : "No link provided";
    const validInstagram =
      instagram && isValidURL(instagram) ? instagram : "No link provided";
    const validLinkedin =
      linkedin && isValidURL(linkedin) ? linkedin : "No link provided";
    const validGithub =
      github && isValidURL(github) ? github : "No link provided";

    return {
      youtube: validYoutube,
      facebook: validFacebook,
      instagram: validInstagram,
      linkedin: validLinkedin,
      github: validGithub,
    };
  };
  const handleChangeSocialMediaUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const socialMediaWithDefault = setDefaultAndCheckURL(formData);

    setAwaitBtnSave(true);
    saveNewSocialMedia(socialMediaWithDefault);
  };
  return (
    <form
      className="user__account__social_media"
      onSubmit={handleChangeSocialMediaUser}
    >
      <span>MEDIA SOCIAUX</span>
      <ul>
        <li>
          <div className="icons_link">
            <AiOutlineYoutube />
          </div>
          <input
            type="text"
            className="input__link"
            placeholder={"No link"}
            name="youtube"
            value={youtube}
            onChange={handleChange}
          />
        </li>
        <li>
          <div className="icons_link">
            <FaSquareFacebook />
          </div>
          <input
            type="text"
            className="input__link"
            placeholder={"No link"}
            name="facebook"
            value={facebook}
            onChange={handleChange}
          />
        </li>
        <li>
          <div className="icons_link">
            <FaInstagram />
          </div>
          <input
            type="text"
            className="input__link"
            placeholder={"No link"}
            name="instagram"
            value={instagram}
            onChange={handleChange}
          />
        </li>
        <li>
          <div className="icons_link">
            <AiOutlineLinkedin />
          </div>
          <input
            type="text"
            className="input__link"
            placeholder={"No link"}
            name="linkedin"
            value={linkedin}
            onChange={handleChange}
          />
        </li>
        <li>
          <div className="icons_link">
            <FaGithub />
          </div>
          <input
            type="text"
            className="input__link"
            placeholder={"No link"}
            name="github"
            value={github}
            onChange={handleChange}
          />
        </li>
      </ul>
      <ButtonSimple
        text={"Enregistrer"}
        isAwaiting={awaitBtnSave}
        isEnable={true}
      />
    </form>
  );
};

const BioUserProfil = ({ overview }) => {
  const [memoValue, setmemoValue] = useState("");
  const [awaitBtnSave, setAwaitBtnSave] = useState(false);
  const { mutate: updateOverview } = useMutation(
    (newOverview) => axios.put("/api/users/overview", newOverview),
    {
      onSuccess: async (response) => {
        setAwaitBtnSave(false);
        setmemoValue(response.data.overview);
      },
      onError: (error) => {
        setAwaitBtnSave(false);
        console.error(error);
        toast.error(
          "Échec de la modification de la déscription de votre profil. Veuillez réessayer ultérieurement."
        );
      },
    }
  );
  const handleChangeBioUser = () => {
    if (memoValue === "") {
      toast.warn("Veuillez remplir la description de votre profil.");
    } else {
      setAwaitBtnSave(true);
      updateOverview({
        overview: memoValue,
      });
    }
  };
  return (
    <div className="container__bio">
      <MemoForm
        placeholder={"Entrez votre bio ici"}
        labelText={"Votre Bio de profil"}
        name={"msg"}
        defaultValue={overview === null ? "Aucune description " : overview}
        handleSetRemoteValue={setmemoValue}
      />
      <ButtonSimple
        text={"Enregistrer"}
        isAwaiting={awaitBtnSave}
        isEnable={!awaitBtnSave}
        eventHandler={handleChangeBioUser}
      />
    </div>
  );
};

const MyProfil = ({ image, name, overview, socialMedia }) => {
  return (
    <section className="section_page profil__infos">
      <Profil name={name} image={image} />
      <BioUserProfil overview={overview} />
      <UserSocialMediaAccount socialMedia={socialMedia} />
    </section>
  );
};

const SectionPostAuthor = ({ name }) => {
  const { data: firstPostAuthor, isLoading } = useGetPersonnalPost(5, 0);
  const [firstLoading, setfirstLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [skipPage, setskipPage] = useState(5);
  const [postAuthor, setPostAuthor] = useState([]);
  const [isVisibleBtnMore, setisVisibleBtnMore] = useState(true);

  if (firstPostAuthor && firstLoading) {
    setPostAuthor((prevPosts) => [...prevPosts, ...firstPostAuthor]);
    setfirstLoading(false);
  }
  const { mutate } = useMutation(
    (skip) => axios.get(`/api/authors/posts/personnal?max=${5}&skip=${skip}`),
    {
      onSuccess: async (response) => {
        if (response.data.length === 0) {
          setisVisibleBtnMore(false);
          toast.success("Tous vos articles sont chargés !");
        } else {
          setPostAuthor((prevPosts) => [...prevPosts, ...response.data]);
          setIsLoadingMore(false);
        }
      },
      onError: (error) => {
        console.error(error);
        setIsLoadingMore(false);
      },
    }
  );

  const loadingNextDataPage = () => {
    setskipPage((old) => old + 5);
    setIsLoadingMore(true);
    mutate(skipPage);
  };
  return (
    <div>
      <section className="section_page content__post">
        <TitleSection
          title={"MES ARTICLES"}
          colorClass={"black"}
          overview={"Liste des articles publiés par " + name}
        />
        <div className="list__post">
          {postAuthor.map((post, index) => (
            <CardPostSimple
              key={post.article_id}
              title={post.title}
              category={post.categories.name_categorie}
              cover={post.article_cover}
              duration={post.read_time_minutes}
              postLink={`/myprofil/articles/${post.article_id}`}
              datePost={formatDateTime(post.date_created)}
              isLoading={false}
            />
          ))}
        </div>
        {isVisibleBtnMore && (
          <ButtonSimple
            text={"Voir plus"}
            eventHandler={loadingNextDataPage}
            isEnable={true}
            isAwaiting={isLoadingMore}
          />
        )}
      </section>
    </div>
  );
};

function MyProfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <main className="page__content">
        <LoaderPage />
      </main>
    );
  } else if (status === "authenticated") {
    const { image, name, overview, socialmedia } = session.user;
    return (
      <Suspense
        fallback={
          <main className="page__content">
            <LoaderPage />
          </main>
        }
      >
        <main className="page__content">
          <MyProfil
            name={name}
            image={image}
            overview={overview}
            socialMedia={socialmedia.length === 0 ? undefined : socialmedia}
          />
          <SectionPostAuthor name={name} />
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
      </Suspense>
    );
  } else {
    router.push("/login");
    return (
      <main className="page__content" id="homePage">
        <LoaderPage />
      </main>
    );
  }
}

export default MyProfilPage;
