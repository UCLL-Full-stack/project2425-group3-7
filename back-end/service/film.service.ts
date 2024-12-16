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
const addFilm = (film: Film) => {
    filmDb.addFilm(film);
}

export default{getAllFilms,getFilmByID,addFilm};