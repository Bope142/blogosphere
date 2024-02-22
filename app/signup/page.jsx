"use client";
import { InputForm } from "@/components/FormControll/FormControll";
import "../../public/style/main.scss";
import "./style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { ButtonSubmitForm } from "@/components/buttons/Buttons";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useMutation } from "react-query";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoaderPage } from "@/components/loaders/Loaders";
const FormSignup = () => {
  const [isInvalidEmail, setisInvalidEmail] = useState(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [awaitingBtnSubmit, setawaitingBtnSubmit] = useState(false);
  let pswd;

  const { mutate, isLoading } = useMutation(
    (newUser) => axios.post("/api/users", newUser),
    {
      onSuccess: async (response) => {
        setawaitingBtnSubmit(false);
        setisInvalidEmail(false);
        setIsInvalidUsername(false);
        setIsInvalidPassword(false);
        toast.success("Félicitations ! Votre compte a été créé avec succès.");

        const result = await signIn("credentials", {
          redirect: false,
          email: response.data.email,
          password: pswd,
          callbackUrl: "/",
        });
      },
      onError: (res, error) => {
        setawaitingBtnSubmit(false);
        if (res.response.data.code === "B-409-EMAIL") {
          setisInvalidEmail(true);
        } else if (res.response.data.code === "B-409-USERNAME") {
          setIsInvalidUsername(true);
        } else {
          console.error(error);
          toast.error(
            "Échec de la création du compte. Veuillez réessayer ultérieurement."
          );
        }
      },
    }
  );

  const signupWithGoogle = async () => {
    const response = await signIn("google", {
      callbackUrl: "/",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isInvalidEmail && !isInvalidPassword && !isInvalidUsername) {
      let form = e.target;
      let formData = new FormData(form);
      let email = formData.get("email");
      let username = formData.get("username");
      let password = formData.get("password");
      let confirmPassword = formData.get("passwordConfirm");
      pswd = formData.get("password");
      if (confirmPassword !== password) {
        setIsInvalidPassword(true);
      } else {
        setawaitingBtnSubmit(true);

        mutate({
          email,
          username,
          password,
        });
      }
    } else {
      toast.warn(
        "Veuillez remplir correctement tous les champs du formulaires..."
      );
    }
  };
  return (
    <div className="form__container">
      <div
        className="btn__connect_with__google"
        onClick={() => signupWithGoogle()}
      >
        <FcGoogle /> <p>Continuez avec Google</p>
      </div>
      <span className="or">OU Inscrivez-vous avec Email</span>
      <form id="form__login" onSubmit={handleSubmit}>
        <InputForm
          type={"text"}
          placeholder={"Entrez votre nom ici"}
          labelText={"Nom Profil *"}
          name={"username"}
          id={"username"}
          isIncorrect={isInvalidUsername}
          msgError={"Ce nom d'utilisateur est déjà pris."}
          changeMsgState={setIsInvalidUsername}
        />
        <InputForm
          type={"email"}
          placeholder={"Entrez adresse email ici"}
          labelText={"Adresse Email *"}
          name={"email"}
          id={"email"}
          isIncorrect={isInvalidEmail}
          msgError={"L'adresse e-mail fournie est déjà associée à un compte."}
          changeMsgState={setisInvalidEmail}
        />
        <InputForm
          type={"password"}
          placeholder={"Entrez mot de passe ici"}
          labelText={"Mot de Passe *"}
          name={"password"}
          id={"password"}
          isIncorrect={false}
          msgError={""}
        />
        <InputForm
          type={"password"}
          placeholder={"Entrez mot de passe ici"}
          labelText={"Confirme Le Mot de Passe *"}
          name={"passwordConfirm"}
          id={"passwordConfirm"}
          isIncorrect={isInvalidPassword}
          msgError={"Le mot de passe de confirmation ne correspond pas"}
          changeMsgState={setIsInvalidPassword}
        />
        <ButtonSubmitForm text={"S’inscrire"} isAwaiting={awaitingBtnSubmit} />
      </form>
      <p className="others">
        Vous avez déjà un comptes ?{" "}
        <Link href={"/login"} className="forget-pswd">
          Connectez vous
        </Link>
      </p>
    </div>
  );
};

function SignupPage() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <main className="page__content">
        <LoaderPage />
      </main>
    );
  } else if (status === "authenticated") {
    router.push("/");
    return (
      <main className="page__content">
        <LoaderPage />
      </main>
    );
  } else {
    return (
      <main className="page__content">
        <section className="section_page contact__container">
          <TitleSection
            title={"INSCRIPTION "}
            colorClass={"black"}
            overview={"HI👋 BON RETOUR"}
          />
          <FormSignup />
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
  }
}

export default SignupPage;
