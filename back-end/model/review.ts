import { User } from './user';
import { Film } from './film';
export class Review {

    private id?: number;
    private film: Film;
    private rating: number;
    private comment: string;
    private reviewer: User;

    constructor(review:{id?: number, film: Film, rating: number, comment: string, reviewer: User}) {
        this.id = review.id;
        this.film = review.film;
        this.rating = review.rating;
        this.comment = review.comment;
        this.reviewer = review.reviewer;
    }

    getId(): number | undefined {
        return this.id;
    }

    getfilm(): Film {
        return this.film;
    }

    getRating(): number {
        return this.rating;
    }

    getComment(): string {
        return this.comment;
    }

    getReviewer(): User {
        return this.reviewer;
    }


}