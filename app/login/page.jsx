"use client";
import { InputForm } from "@/components/FormControll/FormControll";
import "../../public/style/main.scss";
import "./style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { ButtonSubmitForm } from "@/components/buttons/Buttons";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";

const FormLogin = () => {
  const loginWithGoogle = () => {
    signIn("google");
  };
  return (
    <div className="form__container">
      <div
        className="btn__connect_with__google"
        onClick={() => loginWithGoogle()}
      >
        <FcGoogle /> <p>Continuez avec Google</p>
      </div>
      <span className="or">OU connectez-vous avec Email</span>
      <form id="form__login" action="">
        <InputForm
          type={"email"}
          placeholder={"Entrez adresse email ici"}
          labelText={"Adresse Email *"}
          name={"email"}
        />
        <InputForm
          type={"password"}
          placeholder={"Entrez mot de passe ici"}
          labelText={"Mot de Passe *"}
          name={"password"}
        />
        <Link href={""} className="forget-pswd">
          Mot de passe Oublié ?
        </Link>
        <ButtonSubmitForm text={"Connexion "} />
      </form>
      <p className="others">
        Vous n’avez pas des comptes ?{" "}
        <Link href={"/signup"} className="forget-pswd">
          Créer un compte
        </Link>
      </p>
    </div>
  );
};

function LoginPage() {
  return (
    <main className="page__content">
      <section className="section_page contact__container">
        <TitleSection
          title={"connexion"}
          colorClass={"black"}
          overview={"HI👋 BON RETOUR"}
        />
        <FormLogin />
      </section>
    </main>
  );
}

export default LoginPage;
