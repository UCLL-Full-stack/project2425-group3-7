import { User } from './user';
import { Film } from './film';
export class Review {

    private id?: number;
    private film: Film;
    private rating: number;
    private comment: string;
    private reviewer: User;

    constructor(review:{id?: number, film: Film, rating: number, comment: string, reviewer: User}) {
        this.validate(review);

        this.id = review.id;
        this.film = review.film;
        this.rating = review.rating;
        this.comment = review.comment;
        this.reviewer = review.reviewer;
    }
    validate(review:{film: Film, rating: number, comment: string, reviewer: User}){
        if (!review.film) {
            throw new Error('Film is required');
        }
        if (!review.rating || review.rating < 0 || review.rating > 5) {
            throw new Error('Rating is required and must be between 0 and 5');
        }
        if (!review.comment || review.comment.length === 0) {
            throw new Error('Comment is required');
        }
        if (!review.reviewer) {
            throw new Error('Reviewer is required');
        }
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