import Header from "@/components/header";
import UserOverview from "@/components/users/UserOverview";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Users</title>
        <meta name="description" content="Filmpie app - Manage users effectively" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="min-h-screen bg-gray-100">
        <section className="container mx-auto px-6 md:px-12 py-10">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Overview</h2>
            <p className="text-gray-600 mb-8 text-center md:text-left">
              Below is a detailed list of all users registered in the system.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <UserOverview />
          </div>
        </section>
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
