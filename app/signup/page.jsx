import { InputForm } from "@/components/FormControll/FormControll";
import "../../public/style/main.scss";
import "./style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { ButtonSubmitForm } from "@/components/buttons/Buttons";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
const FormSignup = () => {
  return (
    <div className="form__container">
      <div className="btn__connect_with__google">
        <FcGoogle /> <p>Continuez avec Google</p>
      </div>
      <span className="or">OU Inscrivez-vous avec Email</span>
      <form id="form__login" action="">
        <InputForm
          type={"text"}
          placeholder={"Entrez votre nom ici"}
          labelText={"Nom Profil *"}
          name={"email"}
        />
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
        <InputForm
          type={"password"}
          placeholder={"Entrez mot de passe ici"}
          labelText={"Confirme Le Mot de Passe *"}
          name={"password"}
        />
        <ButtonSubmitForm text={"S’inscrire"} />
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
    </main>
  );
}

export default SignupPage;
