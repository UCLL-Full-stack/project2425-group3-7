import { Film } from "../../model/film";

test("given: valid values for film, when: film is created, then: film is created with those values", () => {
    // given
    const releasedate = new Date("2006-06-09");
    const description = "A racecar named Lightning McQueen gets waylaid in Radiator Springs, where he finds the true meaning of friendship and family.";

    // when
    const film = new Film({
        title: "Cars",
        genre: "Animation",
        releasedate: releasedate,
        description: description,
        rating: 4.13,
    });

    // then
    expect(film.getTitle()).toEqual("Cars");
    expect(film.getGenre()).toEqual("Animation");
    expect(film.getReleaseDate()).toEqual(releasedate);
    expect(film.getDescription()).toEqual(description);
    expect(film.getRating()).toEqual(4.1); // rounded to 1 decimal
});

test("given: missing title, when: film is created, then: an error is thrown", () => {
    const releasedate = new Date("2006-06-09");

    expect(() => {
        new Film({
            title: "",
            genre: "Animation",
            releasedate: releasedate,
            description: "A racecar named Lightning McQueen...",
            rating: 4.13,
        });
    }).toThrow("Title is required");
});

test("given: missing genre, when: film is created, then: an error is thrown", () => {
    const releasedate = new Date("2006-06-09");

    expect(() => {
        new Film({
            title: "Cars",
            genre: "",
            releasedate: releasedate,
            description: "A racecar named Lightning McQueen...",
            rating: 4.13,
        });
    }).toThrow("Genre is required");
});

test("given: missing release date, when: film is created, then: an error is thrown", () => {
    expect(() => {
        new Film({
            title: "Cars",
            genre: "Animation",
            releasedate: null as any,
            description: "A racecar named Lightning McQueen...",
            rating: 4.13,
        });
    }).toThrow("Release date is required");
});

test("given: missing description, when: film is created, then: an error is thrown", () => {
    const releasedate = new Date("2006-06-09");

    expect(() => {
        new Film({
            title: "Cars",
            genre: "Animation",
            releasedate: releasedate,
            description: "",
            rating: 4.13,
        });
    }).toThrow("Description is required");
});

test("given: invalid rating, when: film is created, then: an error is thrown", () => {
    const releasedate = new Date("2006-06-09");

    expect(() => {
        new Film({
            title: "Cars",
            genre: "Animation",
            releasedate: releasedate,
            description: "A racecar named Lightning McQueen...",
            rating: 6, // Invalid rating
        });
    }).toThrow("Rating is required and must be between 0 and 5");
});
