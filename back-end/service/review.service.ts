import { Review } from '../model/review';
import filmDb from '../repository/film.db';
import reviewDb from '../repository/review.db';
import userDb from '../repository/user.db';

const getAllReviews = async (): Promise<Review[]> => reviewDb.getAllReviews();

const addReview = async (reviewData: { filmId: number, rating: number, comment: string, userId: number }): Promise<Review> => {
    const film = await filmDb.getFilmById({ id: reviewData.filmId });
    if (!film) {
        throw new Error('Film not found');
    }
    const reviewer = await userDb.getUserById({ id: reviewData.userId });
    if (!reviewer) {
        throw new Error('Reviewer not found');
    }
    const review = new Review({
        film,
        rating: reviewData.rating,
        comment: reviewData.comment,
        reviewer,
    });
    return await reviewDb.addReview(review);
};

export default { getAllReviews, addReview };