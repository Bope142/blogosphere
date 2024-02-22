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
import { redirect } from "next/navigation";
const FormLogin = () => {
  const loginWithGoogle = async () => {
    const response = await signIn("google", {
      callbackUrl: "/",
    });
    console.log(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: "/",
      });
      if (result.status === 200) {
        console.log(result);
        redirect("/");
      } else {
        toast.error(
          "Les identifiants que vous avez fournis ne sont pas valides. Veuillez vérifier votre adresse e-mail et votre mot de passe, puis réessayer."
        );
      }
    } catch (error) {
      // toast.error(
      //   "Les identifiants que vous avez fournis ne sont pas valides. Veuillez vérifier votre adresse e-mail et votre mot de passe, puis réessayer."
      // );
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

export default LoginPage;
