import { Review } from "../model/review";
import database from './database';

const getAllReviews = async (): Promise<Review[]> => {
    try {
        const ReviewPrisma = await database.review.findMany(
            {
                include: {
                    film: true,
                    reviewer: true,
                }
            }
        );
        return ReviewPrisma.map((ReviewPrisma) => Review.from(ReviewPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default {getAllReviews};
