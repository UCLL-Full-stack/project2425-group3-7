const getAllFilms = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/films`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

const addFilmToList = async (title: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/films/addFilm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
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