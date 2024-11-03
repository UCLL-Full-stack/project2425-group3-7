import { Review } from '../model/review';
import ReviewDb from '../repository/review.db';

const getAllReviews = (): Review[] => {
    return ReviewDb.getAllReviews();
};

export default {getAllReviews};