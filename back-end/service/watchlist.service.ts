import { Watchlist } from '../model/watchlist';
import WatchlistDb from '../repository/watchlist.db';

const getAllWatchlists = (): Watchlist[] => {
    try {
        return WatchlistDb.getAllWatchlists();
    } catch (error) {
        console.error('Error retrieving watchlists:', error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {getAllWatchlists};