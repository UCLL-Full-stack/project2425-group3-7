import { Review } from '../model/review';
import ReviewDb from '../repository/review.db';

const getAllReviews = (): Review[] => {
    try {
        return ReviewDb.getAllReviews();
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {getAllReviews};