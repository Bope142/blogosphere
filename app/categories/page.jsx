"use client";
import { useGetCategories } from "@/hooks/useCategorie";
import "../../public/style/main.scss";
import "./style.scss";
import { CardCategory } from "@/components/cards/Cards";
import { LoaderPage } from "@/components/loaders/Loaders";
import { useSession } from "next-auth/react";
export default function CategoriePage() {
  const { data: categories, isFetching } = useGetCategories();
  const { status } = useSession();
  if (status === "loading") {
    return (
      <main className="page__content" id="homePage">
        <LoaderPage />
      </main>
    );
  } else {
    const display = isFetching ? (
      <main className="page__content">
        <section className="section_page categories__list">
          {[...Array(8)].map((_, index) => (
            <CardCategory
              key={index}
              title={""}
              cover={""}
              id={0}
              loading={true}
            />
          ))}
        </section>
      </main>
    ) : (
      <main className="page__content">
        <section className="section_page categories__list">
          {categories.map((category, index) => (
            <CardCategory
              key={index}
              title={category.name_categorie}
              cover={category.coverPath}
              id={category.category_id}
              loading={false}
            />
          ))}
        </section>
      </main>
    );
    return display;
  }
}
