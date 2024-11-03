import Head from "next/head";
import FilmLijstComp from "@/components/filmLijst/filmLijstComp";

const FilmLijst: React.FC = () => {
    return (
        <>
            <Head>
                <title>Films</title>
                <meta name="description" content="Films Lijst" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <header className="flex flex-col space-y-4 mx-auto w-80 bg-white p-6 rounded-xl shadow-lg mt-10">
                <div className="flex items-center justify-between mb-4">
                    <img src="img/pijlLinks.png" className="absolute w-9" />
                    <h1 className="font-bold text-xl flex-grow text-center">Films</h1>
                </div>
            </header>

            <main>
                <FilmLijstComp />
            </main>
        </>
    );
}
export default FilmLijst;