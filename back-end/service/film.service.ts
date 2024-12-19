import { Film } from "../model/film";
import filmDb from "../repository/film.db"; 
const getAllFilms = async (): Promise<Film[]> => {
    return await filmDb.getAllFilms();
}
const getFilmByID = async ({ id }: { id: number }): Promise<Film | null> => {
    if (id <= 0) {
        return null;
    }
    const film = await filmDb.getFilmById({id});
    if (!film) {
        throw new Error('User not found');
    }
    try {
        return film;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
const addFilm = async (filmData: { title: string; genre: string; releaseDate: Date; description: string; rating: number }): Promise<Film> => {
    const film = new Film({
        title: filmData.title,
        genre: filmData.genre,
        releaseDate: filmData.releaseDate,
        description: filmData.description,
        rating: filmData.rating,
        reviews: [],
    });
    return await filmDb.addFilm(film);
};

export default{getAllFilms,getFilmByID,addFilm};