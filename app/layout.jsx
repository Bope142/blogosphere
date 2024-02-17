import { Inter } from "next/font/google";
import "../public/style/main.scss";
import Head from "next/head";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import NavMobile from "@/components/navMobile/NavMobile";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blogosphere - Un monde d'articles variés",
  description:
    "Explorez et partagez des articles passionnants dans différents domaines sur Blogosphere. Créé par Norbert Yemuang Bope.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        <link href={inter.url} rel="stylesheet" />
      </Head>
      <body className={inter.className}>
        <main className="page__container">
          <Header />
          <NavMobile />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
