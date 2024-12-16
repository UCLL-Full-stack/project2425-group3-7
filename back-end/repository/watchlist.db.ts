import { Watchlist } from "../model/watchlist";
import database from './database';


const getAllWatchlists = async (): Promise<Watchlist[]> => {
    try {
        const watchlistPrisma = await database.watchlist.findMany(
            {
                include: {
                    films: true,
                    user: true,
                }
            }
        );
        return watchlistPrisma.map((watchlistPrisma) => Watchlist.from({
            ...watchlistPrisma,
            films: watchlistPrisma.films.map(film => ({
                id: film.filmId,
                title: '',
                genre: '',
                releaseDate: new Date(),
                description: '',
                rating: 0
            }))
        }));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {getAllWatchlists};