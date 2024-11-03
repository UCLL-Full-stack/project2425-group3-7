import { get } from "http";
import { Film } from "../model/film";
import filmDb from "../repository/film.db"; 
const getAllFilms = (): Film[] => {
    return filmDb.getAllFilms();
};
const getFilmByID = ({ id }: { id: number }): Film | null => {
    if (id <= 0) {
        return null;
    }
    const film = filmDb.getFilmByID({id});
    if (!film) {
        throw new Error('Film not found');
    }
    return film;
}

export default{getAllFilms,getFilmByID};