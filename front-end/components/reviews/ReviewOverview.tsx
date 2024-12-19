import React, { useEffect, useState } from 'react';
import ReviewService from '../../services/ReviewService';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export interface Review {
    id: number;
    reviewer: {
        username: string;
    };
    film: {
        title: string;
    };
    rating: number;
    comment: string;
}
const ReviewOverview: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const { t }=useTranslation();
    const router = useRouter();
    
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await ReviewService.getAllReviews();
                const data = await response.json();
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error('API response is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">{t("review.title")}</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">{t("review.reviewer")}</th>
                        <th className="py-2 px-4 border-b">{t("review.film")}</th>
                        <th className="py-2 px-4 border-b">{t("review.rating")}</th>
                        <th className="py-2 px-4 border-b">{t("review.comment")}</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.id}>
                            <td className="py-2 px-4 border-b">{review.reviewer.username}</td>
                            <td className="py-2 px-4 border-b">{review.film.title}</td>
                            <td className="py-2 px-4 border-b">{review.rating}</td>
                            <td className="py-2 px-4 border-b">{review.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button 
                className="bg-oranje text-white px-4 py-2 rounded-lg shadow-md" 
                id="AddReview"
                onClick={() => router.push('/reviews/createReview')}
            >
                add review
            </button>
        </div>
    );
};

export default ReviewOverview;