import { Watchlist } from '../model/watchlist';
import WatchlistDb from '../repository/watchlist.db';

const getAllWatchlists = async (): Promise<Watchlist[]> => {
    return await WatchlistDb.getAllWatchlists();
};

const getWatchlistByUserId = async (userId: number): Promise<Watchlist | null> => {
    return await WatchlistDb.getWatchlistByUserId(userId);
};

const deleteFilmFromWatchlist = async (watchlistId: number, filmId: number): Promise<void> => {
    await WatchlistDb.deleteFilmFromWatchlist(watchlistId, filmId);
};
const addFilmToWatchlist = async (watchlistId: number, filmId: number): Promise<void> => {
    await WatchlistDb.addFilmToWatchlist(watchlistId, filmId);
};
const getWatchlistIdByUserId = async (userId: number): Promise<Watchlist> => {
    const watchlist = await WatchlistDb.getWatchlistByUserId(userId);
    if (!watchlist) {
        throw new Error(`Watchlist not found for userId: ${userId}`);
    }
    return watchlist;
};
export default { getAllWatchlists, getWatchlistByUserId, deleteFilmFromWatchlist,addFilmToWatchlist,getWatchlistIdByUserId};