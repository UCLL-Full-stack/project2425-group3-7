import { Watchlist } from '../model/watchlist';
import WatchlistDb from '../repository/watchlist.db';

const getAllWatchlists = async (): Promise<Watchlist[]> => {
    return await WatchlistDb.getAllWatchlists();
};

const getWatchlistByUserId = async (userId: number): Promise<Watchlist | null> => {
    return await WatchlistDb.getWatchlistByUserId(userId);
};

export default { getAllWatchlists, getWatchlistByUserId };