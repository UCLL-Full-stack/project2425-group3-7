import { set } from "date-fns";
import { Film } from "../../model/film";
import { User } from "../../model/user";
import { Watchlist } from "../../model/watchlist";

const releaseDate1 = new Date("2006-06-09");
const description1 = "A racecar named Lightning McQueen gets waylaid in Radiator Springs, where he finds the true meaning of friendship and family.";
const film1 = new Film({
    title: "Cars",
    genre: "Animation",
    releaseDate: releaseDate1,
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
