import { Review } from '../model/review';
import reviewDb from '../repository/review.db';

const getAllReviews = async (): Promise<Review[]> => reviewDb.getAllReviews();

export default {getAllReviews};