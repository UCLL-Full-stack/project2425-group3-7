import { Review } from "@/types";

const getAllReviews = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
const addReview = (review: Review) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });
};
export default { getAllReviews, addReview };