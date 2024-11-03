import { User } from "../model/user";
import { Watchlist } from "../model/watchlist";
import userDb from "./user.db";

const watchlists = [
    new Watchlist({
        id: 1,
        films: [],
        user: userDb.getUserByID({id: 1}) as User,
        creationDate: new Date('2021-01-01'),
    }),
    new Watchlist({
        id: 2,
        films: [],
        user: userDb.getUserByID({id: 2} ) as User,
        creationDate: new Date('2021-01-01'),
    }),
];
const getAllWatchlists = (): Watchlist[] => {
    return watchlists;
};

export default {getAllWatchlists};