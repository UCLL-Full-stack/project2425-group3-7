import { Review } from "./review";
import { Film as FilmPrisma, Review as ReviewPrisma } from '@prisma/client';

export class Film {
    private id?: number;
    private title: string;
    private genre: string;
    private releaseDate: Date;
    private description: string;
    private rating: number;
    private reviews: Review[];

    constructor(film: { id?: number, title: string, genre: string, releaseDate: Date, description: string, rating: number, reviews: Review[] }) {
        this.validate(film);

        this.id = film.id;
        this.title = film.title;
        this.genre = film.genre;
        this.releaseDate = film.releaseDate;
        this.description = film.description;
        this.rating = Math.round(film.rating * 10) / 10;
        this.reviews = film.reviews || [];
    }

    validate(film: { title: string, genre: string, releaseDate: Date, description: string, rating: number }) {
        if (!film.title || film.title.length === 0) {
            throw new Error('Title is required');
        }
        if (!film.genre || film.genre.length === 0) {
            throw new Error('Genre is required');
        }
        if (!film.releaseDate) {
            throw new Error('Release date is required');
        }
        if (!film.rating || film.rating <= 0 || film.rating > 5) {
            throw new Error('Rating is required and must be between 0 and 5');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getGenre(): string {
        return this.genre;
    }

    getReleaseDate(): Date {
        return this.releaseDate;
    }

    getDescription(): string {
        return this.description;
    }

    getRating(): number {
        return this.rating;
    }

    getReviews(): Review[] {
        return this.reviews;
    }

    static from({ id, title, genre, releaseDate, description, rating, reviews }: FilmPrisma & { reviews: ReviewPrisma[] }) {
        return new Film({
            id,
            title,
            genre,
            releaseDate,
            description,
            rating,
            reviews: reviews.map((review) => Review.from({ ...review, film: { id, title, genre, releaseDate, description, rating }, reviewer: { id: review.reviewerId, username: 'user3', firstName: 'User', lastName: 'Doe', email: 'User@doe', password: 'password', birthday: new Date(), role: 'user' } })),
        });
    }
}