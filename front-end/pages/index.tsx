import Header from "@/components/header";
import Head from "next/head";

const Home: React.FC = () => {

  return (
      <>
          <Head>
              <title>home page</title>
              <meta name="description" content="Courses app" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <main className="text-center md:p-24 p-6 min-h-screen">
              <span className="flex flex-row justify-center items-center">
                  
                  <h1 className="pl-6 text-4xl text-gray-800">home</h1>
              </span>
              <div className="pt-6">
                  <p>home page</p>
              </div>
          </main>
      </>
  );
};

export default Home;