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
    if (!filmDb.getFilmByID({id})) {
        throw new Error('Film not found');
    }
    try {
        return filmDb.getFilmByID({id}) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default{getAllFilms,getFilmByID};