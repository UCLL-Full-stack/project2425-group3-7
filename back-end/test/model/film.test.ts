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
    expect(film.getRating()).toEqual(4.1);
});