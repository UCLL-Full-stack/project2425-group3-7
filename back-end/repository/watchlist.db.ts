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
const deleteFilmFromWatchlist = async (watchlistId: number, filmId: number): Promise<void> => {
    try {
        await database.watchlist.update({
            where: {
                id: watchlistId,
            },
            data: {
                films: {
                    disconnect: {
                        id: filmId,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const addFilmToWatchlist = async (watchlistId: number, filmId: number): Promise<void> => {
    try {
        await database.watchlist.update({
            where: {
                id: watchlistId,
            },
            data: {
                films: {
                    connect: {
                        id: filmId,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const getWatchlistIdByUserId = async (userId: number): Promise<number | null> => {
    try {
        const watchlistPrisma = await database.watchlist.findFirst({
            where: { userId },
            select: { id: true },
        });
        return watchlistPrisma ? watchlistPrisma.id : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllWatchlists, getWatchlistByUserId, deleteFilmFromWatchlist ,addFilmToWatchlist,getWatchlistIdByUserId};