export type Role = 'admin' | 'user' | 'guest';

export type UserInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthday: Date;
    password: string;
    role: Role;
    reviews?: ReviewInput[];
}

export type ReviewInput = {
    id?: number;
    userId: number;
    filmId: number;
    rating: number;
    review: string;
}
export type FilmInput = {
    id?: number;
    title: string;
    genre: string;
    releaseDate: Date;
    description: string;
    rating: number;
    reviews: ReviewInput[];
}
export type WatchlistInput = {
    id?: number;
    films: FilmInput[];
    user: UserInput;
    creationDate: Date;
}
export type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
    userid: number;
};