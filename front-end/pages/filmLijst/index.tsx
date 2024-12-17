import Head from "next/head";
import FilmLijstComp from "@/components/filmLijst/filmLijstComp";
import Header from "@/components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const FilmLijst: React.FC = () => {
    const { t }= useTranslation();
    return (
        <>
            <Head>
                <title>Films</title>
                <meta name="description" content="FilmsLijst" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header/>

            <main>
                <FilmLijstComp />
            </main>
        </>
    );
}
export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;
  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
}
export default FilmLijst;