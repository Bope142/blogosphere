"use client";
import { InputForm } from "@/components/FormControll/FormControll";
import "../../public/style/main.scss";
import "./style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { ButtonSubmitForm } from "@/components/buttons/Buttons";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { LoaderPage } from "@/components/loaders/Loaders";
const FormLogin = () => {
  const router = useRouter();
  const [isInvalidEmail, setisInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [awaitingBtnSubmit, setawaitingBtnSubmit] = useState(false);

  const loginWithGoogle = async () => {
    const response = await signIn("google", {
      callbackUrl: "/",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isInvalidEmail && !isInvalidPassword) {
      setawaitingBtnSubmit(true);
      const form = e.target;
      const formData = new FormData(form);
      const email = formData.get("email");
      const password = formData.get("password");

      try {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          callbackUrl: "/",
        });
        if (result.status === 200) {
          toast.success(
            "Authentification réussie! Vous allez être redirigé vers la page d'accueil dans les 2 prochaines sécondes."
          );
          setTimeout(function () {
            router.push("/");
          }, 2000);
        } else {
          setawaitingBtnSubmit(false);
          setisInvalidEmail(true);
          setIsInvalidPassword(true);
          toast.error(
            "Les identifiants que vous avez fournis ne sont pas valides. Veuillez vérifier votre adresse e-mail et votre mot de passe, puis réessayer."
          );
        }
      } catch (error) {
        toast.error("Oups ! une erreur s'est produite !");
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
        onClick={() => loginWithGoogle()}
      >
        <FcGoogle /> <p>Continuez avec Google</p>
      </div>
      <span className="or">OU connectez-vous avec Email</span>
      <form id="form__login" onSubmit={handleSubmit}>
        <InputForm
          type={"email"}
          placeholder={"Entrez adresse email ici"}
          labelText={"Adresse Email *"}
          name={"email"}
          id={"email"}
          isIncorrect={isInvalidEmail}
          msgError={"Veuillez vérifier votre adresse e-mail ."}
          changeMsgState={setisInvalidEmail}
        />
        <InputForm
          type={"password"}
          placeholder={"Entrez mot de passe ici"}
          labelText={"Mot de Passe *"}
          name={"password"}
          id={"password"}
          isIncorrect={isInvalidPassword}
          msgError={"Veuillez vérifier votre mot de passe."}
          changeMsgState={setIsInvalidPassword}
        />
        {/* <Link href={""} className="forget-pswd">
          Mot de passe Oublié ?
        </Link> */}
        <ButtonSubmitForm text={"Connexion"} isAwaiting={awaitingBtnSubmit} />
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
  const { status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <main className="page__content" id="homePage">
        <LoaderPage />
      </main>
    );
  } else if (status === "authenticated") {
    router.push("/");
    return (
      <main className="page__content" id="homePage">
        <LoaderPage />
      </main>
    );
  } else {
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

export default LoginPage;
