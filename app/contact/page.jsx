import { InputForm, MemoForm } from "@/components/FormControll/FormControll";
import "../../public/style/main.scss";
import "./style.scss";
import TitleSection from "@/components/titleSection/TitleSection";
import { ButtonSubmitForm } from "@/components/buttons/Buttons";

const FormContact = () => {
  return (
    <div className="form__container">
      <form id="form__contact" action="">
        <div className="box-form">
          <InputForm
            type={"text"}
            placeholder={"Entrez votre prénom ici"}
            labelText={"Prénom *"}
            name={"firstname"}
          />
          <InputForm
            type={"text"}
            placeholder={"Entrez votre nom ici"}
            labelText={"Nom *"}
            name={"lastname"}
          />
        </div>
        <div className="box-form">
          <InputForm
            type={"email"}
            placeholder={"Entrez adresse email ici"}
            labelText={"Adresse Email *"}
            name={"email"}
          />
          <InputForm
            type={"tel"}
            placeholder={"Entrez votre numéro ici"}
            labelText={"Numero de Telephone *"}
            name={"phonenumber"}
          />
        </div>
        <MemoForm
          placeholder={"Entrez votre message ici"}
          labelText={"Message *"}
          name={"msg"}
        />
        <ButtonSubmitForm text={"ENVOYER"} />
      </form>
    </div>
  );
};
export default function ContactPage() {
  return (
    <main className="page__content">
      <section className="section_page contact__container">
        <TitleSection
          title={"CONTACT"}
          colorClass={"black"}
          overview={"Contactez-nous pour toute demande de renseignements."}
        />
        <FormContact />
      </section>
    </main>
  );
}
