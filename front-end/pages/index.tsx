import Header from "@/components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import HomePage from "../components/homepage/HomePage";
import { useTranslation } from "next-i18next";

const Home: React.FC = () => {
  const { t }= useTranslation();
  
  return (
    <>
      <Head>
        <title>{t('app.title')}</title>
        <meta name="description" content="Filmpie app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="min-h-screen bg-gray-100">
        <HomePage />
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;
  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
}
