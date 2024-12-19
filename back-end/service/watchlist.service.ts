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
export default { getAllWatchlists, getWatchlistByUserId, deleteFilmFromWatchlist };