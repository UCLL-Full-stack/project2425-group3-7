import { Film } from "../../model/film";
import { Review } from "../../model/review";
import { User } from "../../model/user";

test("given: valid values for review, when: review is created, then: review is created with those values", () => {
    // given
    const releasedate = new Date("2006-06-09");
    const description = "A racecar named Lightning McQueen gets waylaid in Radiator Springs, where he finds the true meaning of friendship and family.";
    const film = new Film({
        title: "Cars",
        genre: "Animation",
        releasedate: releasedate,
        description: description,
        rating: 4.13,
    });
    const birthday = new Date("2000-01-01");
    const reviewer = new User({
        username: "slimmerik",
        firstName: "Slimme",
        lastName: "Rik",
        email: "slimme.rik@gmail.com",
        birthday: birthday,
        password: "Slimme-Rik123",
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