type UserInput = {
    email: string;
    password: string;
};

type FilmInput = {
    title: string;
    releaseDate: Date;
    duration: number;
    actors: string[];
    genres: string[];
};

type WatchlistInput = {
    userId: number;
    filmId: number;
};

type ReviewInput = {
    userId: number;
    filmId: number;
    rating: number;
    review: string;
};

export { UserInput, FilmInput, WatchlistInput, ReviewInput };