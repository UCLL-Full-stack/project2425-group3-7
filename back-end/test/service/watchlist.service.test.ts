import watchlistService from '../../service/watchlist.service';
import watchlistDb from '../../repository/watchlist.db';
import { Watchlist } from '../../model/watchlist';
import { User } from '../../model/user';
import { Film } from '../../model/film';

let mockWatchlistDbGetAllWatchlists: jest.SpyInstance<Promise<Watchlist[]>, []>;
let mockWatchlistDbGetWatchlistByUserId: jest.SpyInstance<Promise<Watchlist | null>, [number]>;
let mockWatchlistDbDeleteFilmFromWatchlist: jest.SpyInstance<Promise<void>, [number, number]>;

beforeEach(() => {
    mockWatchlistDbGetAllWatchlists = jest.spyOn(watchlistDb, 'getAllWatchlists');
    mockWatchlistDbGetWatchlistByUserId = jest.spyOn(watchlistDb, 'getWatchlistByUserId');
    mockWatchlistDbDeleteFilmFromWatchlist = jest.spyOn(watchlistDb, 'deleteFilmFromWatchlist');
});

afterEach(() => {
    jest.resetAllMocks();
});

test('when getting all watchlists, then returns list of watchlists', async () => {
    const watchlists = [new Watchlist({ films: [], user: new User({
        username: "slimmerik",
        firstName: "Slimme",
        lastName: "Rik",
        email: "slimme.rik@gmail.com",
        birthday: new Date("2000-01-01"),
        password: "validPassword123",
        role: "user",
        reviews: [],
    }), creationDate: new Date() })];
    mockWatchlistDbGetAllWatchlists.mockResolvedValue(watchlists);

    const result = await watchlistService.getAllWatchlists();

    expect(result).toEqual(watchlists);
    expect(mockWatchlistDbGetAllWatchlists).toHaveBeenCalledTimes(1);
});

test('when database error occurs on getAllWatchlists, then throws error', async () => {
    mockWatchlistDbGetAllWatchlists.mockRejectedValue(new Error('Database error'));

    await expect(watchlistService.getAllWatchlists()).rejects.toThrow('Database error');
    expect(mockWatchlistDbGetAllWatchlists).toHaveBeenCalledTimes(1);
});

test('given a valid user ID, when getting watchlist by user ID, then returns watchlist', async () => {
    const watchlist = new Watchlist({ films: [], user: new User({
        username: "slimmerik",
        firstName: "Slimme",
        lastName: "Rik",
        email: "slimme.rik@gmail.com",
        birthday: new Date("2000-01-01"),
        password: "validPassword123",
        role: "user",
        reviews: [],
    }), creationDate: new Date() });
    mockWatchlistDbGetWatchlistByUserId.mockResolvedValue(watchlist);

    const result = await watchlistService.getWatchlistByUserId(1);

    expect(result).toEqual(watchlist);
    expect(mockWatchlistDbGetWatchlistByUserId).toHaveBeenCalledTimes(1);
});

test('given an invalid user ID, when getting watchlist by user ID, then returns null', async () => {
    mockWatchlistDbGetWatchlistByUserId.mockResolvedValue(null);

    const result = await watchlistService.getWatchlistByUserId(-1);

    expect(result).toBeNull();
    expect(mockWatchlistDbGetWatchlistByUserId).toHaveBeenCalledTimes(1);
});

test('given a valid watchlist ID and film ID, when deleting film from watchlist, then calls deleteFilmFromWatchlist', async () => {
    mockWatchlistDbDeleteFilmFromWatchlist.mockResolvedValue();

    await watchlistService.deleteFilmFromWatchlist(1, 1);

    expect(mockWatchlistDbDeleteFilmFromWatchlist).toHaveBeenCalledTimes(1);
    expect(mockWatchlistDbDeleteFilmFromWatchlist).toHaveBeenCalledWith(1, 1);
});

test('given an invalid watchlist ID or film ID, when deleting film from watchlist, then throws error', async () => {
    mockWatchlistDbDeleteFilmFromWatchlist.mockRejectedValue(new Error('Invalid ID'));

    await expect(watchlistService.deleteFilmFromWatchlist(-1, -1)).rejects.toThrow('Invalid ID');
    expect(mockWatchlistDbDeleteFilmFromWatchlist).toHaveBeenCalledTimes(1);
});