import watchlistService from '../../service/watchlist.service';
import watchlistDb from '../../repository/watchlist.db';
import { Watchlist } from '../../model/watchlist';
import { User } from '../../model/user';

let mockWatchlistDbGetAllWatchlists: jest.SpyInstance<Watchlist[], []>;

beforeEach(() => {
    mockWatchlistDbGetAllWatchlists = jest.spyOn(watchlistDb, 'getAllWatchlists');
});

afterEach(() => {
    jest.resetAllMocks();
});

test('when getting all watchlists, then returns list of watchlists', () => {
    const watchlists = [new Watchlist({ films: [], user: new User({
        username: "slimmerik",
        firstName: "Slimme",
        lastName: "Rik",
        email: "slimme.rik@gmail.com",
        birthday: new Date("2000-01-01"),
        password: "validPassword123",
    }), creationDate: new Date() })];
    mockWatchlistDbGetAllWatchlists.mockReturnValue(watchlists);

    const result = watchlistService.getAllWatchlists();

    expect(result).toEqual(watchlists);
    expect(mockWatchlistDbGetAllWatchlists).toHaveBeenCalledTimes(1);
});

test('when database error occurs on getAllWatchlists, then throws error', () => {
    mockWatchlistDbGetAllWatchlists.mockImplementation(() => { throw new Error('Database error'); });

    expect(() => watchlistService.getAllWatchlists()).toThrow('Database error. See server log for details.');
});
