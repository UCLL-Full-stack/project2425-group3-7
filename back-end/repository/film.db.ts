import { Film } from '../model/film';
import database from './database';

const getAllFilms = async (): Promise<Film[]> => {
    try {
        const filmPrisma = await database.film.findMany(
            {
                include: {
                    reviews: true,
                }
            }
        );
        return filmPrisma.map((filmPrisma) => Film.from(filmPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const getFilmById = async ({ id }: { id: number }): Promise<Film | null> => {
    try {
        const filmPrisma = await database.film.findUnique({
            where: { id },
            include: {
                reviews: true,
            },
        });
        return filmPrisma ? Film.from(filmPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const addFilm = async (film: Film): Promise<Film> => {
    try {
        const filmPrisma = await database.film.create({
            data: {
                title: film.getTitle(),
                genre: film.getGenre(),
                releaseDate: film.getReleaseDate(),
                description: film.getDescription(),
                rating: film.getRating(),
            },
            include: {
                reviews: true,
            },
        });
        return Film.from(filmPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default {getAllFilms,getFilmById,addFilm};