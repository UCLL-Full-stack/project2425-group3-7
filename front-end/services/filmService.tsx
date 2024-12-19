import { Film } from "@/types";

const getAllFilms = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/films`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

const addFilmToList = async (film:Film) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films/addFilm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ film }),
    });
    if (!response.ok) {
        throw new Error('Failed to add film');
    }
    return response.json();
}

const filmService = {
    getAllFilms,
    addFilmToList,
};

export default filmService;