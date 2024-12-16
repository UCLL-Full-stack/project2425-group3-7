import { Watchlist } from '../model/watchlist';
import WatchlistDb from '../repository/watchlist.db';

const getAllWatchlists = async (): Promise<Watchlist[]> => {
    return await WatchlistDb.getAllWatchlists();
}

export default {getAllWatchlists};