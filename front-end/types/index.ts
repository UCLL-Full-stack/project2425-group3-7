export type User = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    birthday?: Date;
    password?: string;
    role?: Role;
    reviews?: Review[];
}
export type Role = 'admin' | 'user' | 'guest';

export type Review = {
    id?: number;
    userId: number;
    filmId: number;
    rating: number;
    review: string;
}
export type Film = {
    id?: number;
    title: string;
    genre: string;
    releaseDate: Date;
    description: string;
    rating: number;
    reviews: Review[];
}
export type Watchlist = {
    id?: number;
    userId: number;
    filmId: number;
}
export type StatusMessage = {
    message: string;
    type: "error" | "success";
};