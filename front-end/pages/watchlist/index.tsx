import Head from "next/head";
import Header from "../../components/header";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import WatchlistOverview from "@/components/watchlist/WatchlistOverview";
const Watchlist: React.FC = () => {
    const { t }= useTranslation();
    return (
        <>
            <Head>
                <title>{t('app.title')}</title>
            </Head>
            <Header />
            <main>
                <section className="p-6 min-h-screen flex flex-col items-center">
                    <WatchlistOverview />
                </section>
            </main>
        </>
    );
};
export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;
  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
}
export default Watchlist;
