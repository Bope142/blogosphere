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

const FormSignup = () => {
  const [isInvalidEmail, setisInvalidEmail] = useState(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [awaitingBtnSubmit, setawaitingBtnSubmit] = useState(false);

  const { mutate, isLoading } = useMutation(
    (newUser) => axios.post("/api/users", newUser),
    {
      onSuccess: (response) => {
        setawaitingBtnSubmit(false);
        setisInvalidEmail(false);
        setIsInvalidUsername(false);
        setIsInvalidPassword(false);
        console.log("data ok", response.data);
        signIn("credentials", {
          email: response.data.email,
          password: response.data.password_hash,
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

  const signupWithGoogle = () => {
    signIn("google");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isInvalidEmail && !isInvalidPassword && !isInvalidUsername) {
      const form = e.target;
      const formData = new FormData(form);
      console.log(...formData);
      const email = formData.get("email");
      const username = formData.get("username");
      const password = formData.get("password");
      const confirmPassword = formData.get("passwordConfirm");
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

export default SignupPage;
