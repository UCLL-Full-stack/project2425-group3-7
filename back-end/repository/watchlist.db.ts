import { Watchlist } from "../model/watchlist";
import database from './database';

const getAllWatchlists = async (): Promise<Watchlist[]> => {
    try {
        const watchlistPrisma = await database.watchlist.findMany({
            include: {
                films: true,
                user: true,
            },
        });
        return watchlistPrisma.map((watchlistPrisma) => Watchlist.from(watchlistPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWatchlistByUserId = async (userId: number): Promise<Watchlist | null> => {
    try {
        const watchlistPrisma = await database.watchlist.findFirst({
            where: { userId },
            include: {
                films: true,
                user: true,
            },
        });
        return watchlistPrisma ? Watchlist.from(watchlistPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllWatchlists, getWatchlistByUserId };