import Header from "@/components/header";
import UserOverview from "@/components/users/UserOverview";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Users</title>
        <meta name="description" content="Filmpie app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="min-h-screen bg-gray-100">
          <UserOverview />
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
