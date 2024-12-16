import Head from "next/head";
import FilmLijstComp from "@/components/filmLijst/filmLijstComp";
import Header from "@/components/header";
const FilmLijst: React.FC = () => {
    return (
        <>
            <Head>
                <title>Films</title>
                <meta name="description" content="Films Lijst" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header/>

            <main>
                <FilmLijstComp />
            </main>
        </>
    );
}
export default FilmLijst;