"use client";
import React, { Suspense, useEffect, useState } from "react";
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
const UserProfil = ({ image, name }) => {
  if (image === null) {
    return <p>{name.substring(0, 2).toUpperCase()}</p>;
  } else {
    return (
      <Image
        src={image}
        width={100}
        height={100}
        alt={"photo profile user " + name}
      />
    );
  }
};

const Profil = ({ image, name }) => {
  return (
    <div className="user__cover">
      <div className="cover__bg"></div>
      <div className="content">
        <div className="img-user">
          <UserProfil image={image} name={name} />
        </div>
        <h2>{name}</h2>
        <div className="container__btn__action">
          <ButtonDefault
            text={"Changer la photo"}
            isAwaiting={false}
            isEnable={true}
          />
          <ButtonSimple
            text={"Enregistrer"}
            isAwaiting={false}
            isEnable={true}
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

const UserSocialMediaAccount = () => {
  return (
    <div className="user__account__social_media">
      <span>MEDIA SOCIAUX</span>
      <ul>
        <li>
          <div className="icons_link">
            <AiOutlineYoutube />
          </div>
          <input
            type="link"
            className="input__link"
            value={"http://localhost:3000/authors/5"}
          />
        </li>
        <li>
          <div className="icons_link">
            <FaSquareFacebook />
          </div>
          <input
            type="link"
            className="input__link"
            value={"http://localhost:3000/authors/5"}
          />
        </li>
        <li>
          <div className="icons_link">
            <FaInstagram />
          </div>
          <input
            type="link"
            className="input__link"
            value={"http://localhost:3000/authors/5"}
          />
        </li>
        <li>
          <div className="icons_link">
            <AiOutlineLinkedin />
          </div>
          <input
            type="link"
            className="input__link"
            value={"http://localhost:3000/authors/5"}
          />
        </li>
        <li>
          <div className="icons_link">
            <FaGithub />
          </div>
          <input
            type="link"
            className="input__link"
            value={"http://localhost:3000/authors/5"}
          />
        </li>
      </ul>
      <ButtonSimple text={"Enregistrer"} isAwaiting={false} isEnable={true} />
    </div>
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

const MyProfil = ({ image, name, overview }) => {
  return (
    <section className="section_page profil__infos">
      <Profil name={name} image={image} />
      <BioUserProfil overview={overview} />
      <UserSocialMediaAccount />
    </section>
  );
};

// const SectionPostAuthor = () => {
//   const [skipPage, setSkipPage] = useState(0);
//   const [posts, setPosts] = useState([]);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   const { mutate, isLoading, isError } = useMutation(
//     (skip) => axios.get(`/api/authors/posts/personnal?max=${1}&skip=${skip}`),
//     {
//       onSuccess: async (response) => {
//         console.log(response);
//         if (response.data) {
//           // Filtrer les nouveaux articles pour éviter les doublons
//           const newPosts = response.data.filter(
//             (newPost) =>
//               !posts.some(
//                 (oldPost) => oldPost.article_id === newPost.article_id
//               )
//           );
//           setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//           setIsLoadingMore(false);
//         }
//       },
//       onError: (error) => {
//         setIsLoadingMore(false);
//         console.error(error);
//       },
//     }
//   );

//   useEffect(() => {
//     mutate(skipPage);
//   }, [skipPage, mutate]);

//   const handleNextPage = () => {
//     setSkipPage((prevSkipPage) => prevSkipPage + 1);
//     setIsLoadingMore(true);
//   };

//   console.log(posts);
//   return (
//     <section className="section_page content__post">
//       <TitleSection
//         title={"MES ARTICLES"}
//         colorClass={"black"}
//         overview={"dernières nouvelles sur la technologie"}
//       />
//       <div className="list__post">
//         {isLoading ? (
//           <p>Chargement...</p>
//         ) : isError ? (
//           <p>Une erreur s est produite lors du chargement des articles.</p>
//         ) : posts.length > 0 ? (
//           <>
//             {posts.map((post) => (
//               <CardPostSimple
//                 key={post.article_id}
//                 title={post.title}
//                 category={post.categories.name_categorie}
//                 cover={post.article_cover}
//                 duration={post.read_time_minutes}
//                 postLink={`/myprofil/articles/${post.article_id}`}
//                 datePost={formatDateTime(post.date_created)}
//                 isLoading={false}
//               />
//             ))}
//           </>
//         ) : (
//           <p>Aucun post</p>
//         )}
//       </div>
//       <ButtonSimple
//         text={"Voir plus"}
//         eventHandler={handleNextPage}
//         isEnable={true}
//         isAwaiting={isLoadingMore}
//       />
//     </section>
//   );
// };

const SectionPostAuthor = () => {
  const [page, setPage] = useState(0);

  const fetchPosts = async (page = 0) => {
    const response = await axios.get(
      `/api/authors/posts/personnal?max=${1}&skip=${page}`
    );
    return response.data;
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["projects", page], () => fetchPosts(page), {
      keepPreviousData: true,
    });

  return (
    <div>
      <section className="section_page content__post">
        <TitleSection
          title={"MES ARTICLES"}
          colorClass={"black"}
          overview={"dernières nouvelles sur la technologie"}
        />
        <div className="list__post">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <div>
              {data.map((post) => (
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
          )}
        </div>
      </section>
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          setPage((old) => old + 1);
        }}
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{" "}
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
    const { image, name, overview } = session.user;
    return (
      <Suspense
        fallback={
          <main className="page__content">
            <LoaderPage />
          </main>
        }
      >
        <main className="page__content">
          <MyProfil name={name} image={image} overview={overview} />
          <SectionPostAuthor />
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
