const getAllFilms = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/films/allFilms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}