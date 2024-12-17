import React, { useEffect, useState } from 'react';
import ReviewService from '../../services/ReviewService';

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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await ReviewService.getAllReviews();
                const data = await response.json();
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error('API response is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Review Overview</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Reviewer</th>
                        <th className="py-2 px-4 border-b">Film</th>
                        <th className="py-2 px-4 border-b">Rating</th>
                        <th className="py-2 px-4 border-b">Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.id}>
                            <td className="py-2 px-4 border-b">{review.id}</td>
                            <td className="py-2 px-4 border-b">{review.reviewer.username}</td>
                            <td className="py-2 px-4 border-b">{review.film.title}</td>
                            <td className="py-2 px-4 border-b">{review.rating}</td>
                            <td className="py-2 px-4 border-b">{review.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewOverview;