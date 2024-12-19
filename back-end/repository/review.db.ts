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
const addReview = async (review: Review): Promise<Review> => {
    try {
        const createdReview = await database.review.create({
            data: {
                rating: review.getRating(),
                comment: review.getComment(),
                film: {
                    connect: { id: review.getfilm().getId() },
                },
                reviewer: {
                    connect: { id: review.getReviewer().getId() },
                },
            },
            include: {
                film: true,
                reviewer: true,
            },
        });
        return Review.from(createdReview);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default {getAllReviews, addReview};
