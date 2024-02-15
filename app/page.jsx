import { CardCategory } from "@/components/cards/Cards";
import "../public/style/main.scss";
import "./home.style.scss";

const CategoriePostSection = () => {
  const categories = [
    { title: "Technologie et Innovation", cover: "/images/tech_cover.png" },
    { title: "Voyage et Aventure", cover: "/images/voyage.jpg" },
    { title: "Cuisine et Gastronomie", cover: "/images/Cuisine.jpg" },
    { title: "Art et Culture", cover: "/images/Art.jpg" },
    { title: "Santé et Bien-être", cover: "/images/Sante.jpg" },
    { title: "Mode et Beauté", cover: "/images/Mode.jpg" },
    { title: "Finance et Investissement", cover: "/images/Finance.jpg" },
    {
      title: "Environnement et Durabilité",
      cover: "/images/Environnement.jpg",
    },
    { title: "Parentalité et Éducation", cover: "/images/Education.jpg" },
    { title: "Science et Nature", cover: "/images/Science.jpg" },
    { title: "Sports et Fitness", cover: "/images/Sports.jpg" },
    { title: "Actualités et Politique", cover: "/images/Politique.jpg" },
  ];
  return (
    <section className="section_page content__categorie_post">
      {categories.map((category, index) => (
        <CardCategory
          key={index}
          title={category.title}
          cover={category.cover}
        />
      ))}
    </section>
  );
};
export default function Home() {
  return (
    <main className="page__content" id="homePage">
      <CategoriePostSection />
    </main>
  );
}
