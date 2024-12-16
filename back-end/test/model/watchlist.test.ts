import { set } from "date-fns";
import { Film } from "../../model/film";
import { User } from "../../model/user";
import { Watchlist } from "../../model/watchlist";

const releasedate1 = new Date("2006-06-09");
const description1 = "A racecar named Lightning McQueen gets waylaid in Radiator Springs, where he finds the true meaning of friendship and family.";
const film1 = new Film({
    title: "Cars",
    genre: "Animation",
    releasedate: releasedate1,
    description: description1,
    rating: 4.13,
    reviews: [],
});
const birthday = new Date("2000-01-01");
const user = new User({
    username: "slimmerik",
    firstName: "Slimme",
    lastName: "Rik",
    email: "slimme.rik@gmail.com",
    birthday: birthday,
    password: "Slimme-Rik123",
    role: "user",
    reviews: [],
});
const creationDate = set(new Date(), {year: 2024, month: 10, date: 17, hours: 12, minutes: 33});

test("given: valid values for watchlist, when: watchlist is created, then: watchlist is created with those values", () => {
    // when
    const watchlist = new Watchlist({
        films: [film1],
        user: user,
        creationDate: creationDate,
    });

    // then
    expect(watchlist.getFilms()).toContain(film1);
    expect(watchlist.getUser()).toEqual(user);
    expect(watchlist.getCreationDate()).toEqual(creationDate);
});

test("given: an existing watchlist, when: adding a film to watchlist, then: film is added to watchlist", () => {
    const releasedate2 = new Date("2014-10-24");
    const description2 = "John Wick is a former hitman grieving the loss of his true love. When his home is broken into, robbed, and his dog killed, he is forced to return to action to exact revenge.";
    const film2 = new Film({
        title: "John Wick",
        genre: "Action",
        releasedate: releasedate2,
        description: description2,
        rating: 4.5,
        reviews: [],
    });
    const watchlist = new Watchlist({
        films: [film1],
        user: user,
        creationDate: creationDate,
    });

    // when
    watchlist.addFilmToWatchlist(film2);

    // then
    expect(watchlist.getFilms()).toContain(film1);
    expect(watchlist.getFilms()).toContain(film2);
});

test("given: an existing watchlist, when: adding a film already in watchlist, then: film is not added to watchlist", () => {
    const watchlist = new Watchlist({
        films: [film1],
        user: user,
        creationDate: creationDate,
    });

    // when
    watchlist.addFilmToWatchlist(film1);

    // then
    expect(watchlist.getFilms().length).toBe(1);
});

test("given: missing films, when: watchlist is created, then: an error is thrown", () => {
    expect(() => {
        new Watchlist({
            films: null as any,
            user: user,
            creationDate: creationDate,
        });
    }).toThrow("Films are required");
});

test("given: missing user, when: watchlist is created, then: an error is thrown", () => {
    expect(() => {
        new Watchlist({
            films: [film1],
            user: null as any,
            creationDate: creationDate,
        });
    }).toThrow("User is required");
});

test("given: missing creation date, when: watchlist is created, then: an error is thrown", () => {
    expect(() => {
        new Watchlist({
            films: [film1],
            user: user,
            creationDate: null as any,
        });
    }).toThrow("Creation date is required");
});
