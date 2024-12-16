import { Film } from "../../model/film";
import { Review } from "../../model/review";
import { User } from "../../model/user";

test("given: valid values for review, when: review is created, then: review is created with those values", () => {
    // given
    const releaseDate = new Date("2006-06-09");
    const description = "A racecar named Lightning McQueen gets waylaid in Radiator Springs, where he finds the true meaning of friendship and family.";
    const film = new Film({
        title: "Cars",
        genre: "Animation",
        releaseDate: releaseDate,
        description: description,
        rating: 4.13,
        reviews: [],
    });
    const birthday = new Date("2000-01-01");
    const reviewer = new User({
        username: "slimmerik",
        firstName: "Slimme",
        lastName: "Rik",
        email: "slimme.rik@gmail.com",
        birthday: birthday,
        password: "Slimme-Rik123",
        role: "user",
        reviews: [],
    });

    // when
    const review = new Review({
        film: film,
        rating: 4.5,
        comment: "Great movie",
        reviewer: reviewer,
    });

    // then
    expect(review.getfilm()).toEqual(film);
    expect(review.getRating()).toEqual(4.5);
    expect(review.getComment()).toEqual("Great movie");
    expect(review.getReviewer()).toEqual(reviewer);
});

test("given: missing film, when: review is created, then: an error is thrown", () => {
    const birthday = new Date("2000-01-01");
    const reviewer = new User({
        username: "slimmerik",
        firstName: "Slimme",
        lastName: "Rik",
        email: "slimme.rik@gmail.com",
        birthday: birthday,
        password: "Slimme-Rik123",
        role: "user",
        reviews: [],
    });

    expect(() => {
        new Review({
            film: null as any,
            rating: 4.5,
            comment: "Great movie",
            reviewer: reviewer,
        });
    }).toThrow("Film is required");
});

test("given: invalid rating, when: review is created, then: an error is thrown", () => {
    const releaseDate = new Date("2006-06-09");
    const film = new Film({
        title: "Cars",
        genre: "Animation",
        releaseDate: releaseDate,
        description: "A racecar named Lightning McQueen...",
        rating: 4.13,
        reviews: [],
    });
    const birthday = new Date("2000-01-01");
    const reviewer = new User({
        username: "slimmerik",
        firstName: "Slimme",
        lastName: "Rik",
        email: "slimme.rik@gmail.com",
        birthday: birthday,
        password: "Slimme-Rik123",
        role: "user",
        reviews: [],
    });

    expect(() => {
        new Review({
            film: film,
            rating: 6, // Invalid rating
            comment: "Great movie",
            reviewer: reviewer,
        });
    }).toThrow("Rating is required and must be between 0 and 5");
});

test("given: missing comment, when: review is created, then: an error is thrown", () => {
    const releaseDate = new Date("2006-06-09");
    const film = new Film({
        title: "Cars",
        genre: "Animation",
        releaseDate: releaseDate,
        description: "A racecar named Lightning McQueen...",
        rating: 4.13,
        reviews: [],
    });
    const birthday = new Date("2000-01-01");
    const reviewer = new User({
        username: "slimmerik",
        firstName: "Slimme",
        lastName: "Rik",
        email: "slimme.rik@gmail.com",
        birthday: birthday,
        password: "Slimme-Rik123",
        role: "user",
        reviews: [],
    });

    expect(() => {
        new Review({
            film: film,
            rating: 4.5,
            comment: "", // Missing comment
            reviewer: reviewer,
        });
    }).toThrow("Comment is required");
});

test("given: missing reviewer, when: review is created, then: an error is thrown", () => {
    const releaseDate = new Date("2006-06-09");
    const film = new Film({
        title: "Cars",
        genre: "Animation",
        releaseDate: releaseDate,
        description: "A racecar named Lightning McQueen...",
        rating: 4.13,
        reviews: [],
    });

    expect(() => {
        new Review({
            film: film,
            rating: 4.5,
            comment: "Great movie",
            reviewer: null as any, // Missing reviewer
        });
    }).toThrow("Reviewer is required");
});
