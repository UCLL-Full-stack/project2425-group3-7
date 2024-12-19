import Head from "next/head";
import FilmLijstComp from "@/components/filmLijst/addFilmComp";
import Header from "@/components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddFilmComp from "@/components/filmLijst/addFilmComp";
const AddFilm: React.FC = () => {
    const { t }= useTranslation();
    return (
        <>
            <Head>
                <title>AddFilm</title>
                <meta name="description" content="AddFilm" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header/>

            <main>
                <AddFilmComp />
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
export default AddFilm;