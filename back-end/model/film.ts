import { Review } from "./review";

export class Film {
    private id?: number;
    private title: string;
    private genre: string;
    private releasedate: Date;
    private description: string;
    private rating: number;
    private reviews: Review[];

    constructor(film:{id?: number, title: string, genre: string, releasedate: Date, description: string, rating: number, reviews: Review[]}) {
        this.validate(film);

        this.id = film.id;
        this.title = film.title;
        this.genre = film.genre;
        this.releasedate = film.releasedate;
        this.description = film.description;
        this.rating = Math.round(film.rating * 10) / 10;
        this.reviews = film.reviews || [];
    }
    validate(film:{title: string, genre: string, releasedate: Date, description: string, rating: number}){
        if (!film.title || film.title.length === 0) {
            throw new Error('Title is required');
        }
        if (!film.genre || film.genre.length === 0) {
            throw new Error('Genre is required');
        }
        if (!film.releasedate) {
            throw new Error('Release date is required');
        }
        if (!film.rating || film.rating < 0 || film.rating > 5) {
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
        return this.releasedate;
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

    equals(film: Film): boolean {
        return (
            this.id === film.getId() &&
            this.title === film.getTitle() &&
            this.genre === film.getGenre() &&
            this.releasedate === film.getReleaseDate() &&
            this.description === film.getDescription() &&
            this.rating === film.getRating() &&
            this.reviews === film.getReviews()
        );
    }
}