import React, { useState, useEffect } from 'react';
import reviewService from '@/services/ReviewService';
import filmService from '@/services/filmService';
import { useTranslation } from 'next-i18next';
import { User } from '@/types';

const WriteReview: React.FC = () => {
    interface Film {
        id: number;
        title: string;
    }
    interface User {
        username: string;
        userid: number;
    }

    const [films, setFilms] = useState<Film[]>([]);
    const [selectedFilm, setSelectedFilm] = useState('');
    const [rating, setRating] = useState<number | "">('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser") as string);
        if (!user) {
            setError("You must be logged in to view this page.");
        } else {
            setLoggedInUser(user);
        }
    }, []);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await filmService.getAllFilms();
                const data = await response.json();
                setFilms(data);
            } catch (error) {
                console.error('Failed to fetch films', error);
            }
        };

        fetchFilms();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let isError = false;
        setError('');

        if (selectedFilm.trim() === '' || selectedFilm === "Select Film") {
            setError('Film is required');
            isError = true;
        }
        if (rating === '' || rating < 0 || rating > 5) {
            setError('Rating is required and must be between 0 and 5');
            isError = true;
        }
        if (comment.trim() === '') {
            setError('Comment is required');
            isError = true;
        }

        if (isError) {
            return;
        }

        try {
            if (loggedInUser) {
                const userId = loggedInUser.userid;
                await reviewService.addReview({ userId: userId, filmId: Number(selectedFilm), rating: Number(rating), comment });
            } else {
                setError('User is not logged in');
            }
            setSelectedFilm('');
            setRating('');
            setComment('');
        } catch (error) {
            setError('Failed to add review');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mx-auto mb-12 w-80 bg-white p-6 rounded-xl shadow-lg mt-10">
            {error && <span className="text-red-500 font-bold">{error}</span>}

            <label htmlFor="film" className="text-sm font-medium">
                {t("review.film")}
            </label>
            <select
                id="film"
                value={selectedFilm}
                onChange={(event) => setSelectedFilm(event.target.value)}
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                <option value="">{t("review.selectFilm")}</option>
                {films.map((film) => (
                    <option key={film.id} value={film.id}>
                        {film.title}
                    </option>
                ))}
            </select>

            <label htmlFor="rating" className="text-sm font-medium">
                {t("review.rating")}
            </label>
            <input
                type="number"
                id="rating"
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                min="0"
                max="5"
                step="0.1"
            />

            <label htmlFor="comment" className="text-sm font-medium">
                {t("review.comment")}
            </label>
            <textarea
                id="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />

            <button className="bg-oranje text-white px-4 py-2 rounded-lg shadow-md" type="submit">
                {t("buttons.submit")}
            </button>
        </form>
    );
};

export default WriteReview;