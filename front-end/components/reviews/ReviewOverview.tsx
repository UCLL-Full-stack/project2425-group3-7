import React, { useEffect, useState } from 'react';
import ReviewService from '../../services/ReviewService';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { User } from '@/types';

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
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
            const user = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
            if (!user) {
                setError('You must be logged in to view this page.');
            } else {
                setLoggedInUser(user);
            }
        }, []);
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
        const fetchUserRole = () => {
            const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
            if (loggedInUser) {
                setUserRole(loggedInUser.role);
            }
        };
        fetchReviews();
        fetchUserRole();
        
    }, []);

    return (
        <div className="container mx-auto mt-10">
            {error && <p className="text-red-500">{error}</p>}
            {loggedInUser && (
            <><h1 className="text-2xl font-bold mb-4">{t("review.title")}</h1><table className="min-w-full bg-white">
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
                </table></>
            )}
            {loggedInUser && userRole !== 'guest' && (
                <button 
                    className="bg-oranje text-white px-4 py-2 rounded-lg shadow-md" 
                    id="AddReview"
                    onClick={() => router.push('/reviews/createReview')}
                >
                    add review
                </button>
            )}
        </div>
    );
};

export default ReviewOverview;