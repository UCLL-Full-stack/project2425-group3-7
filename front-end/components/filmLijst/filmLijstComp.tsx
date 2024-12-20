import React, { useEffect, useState } from 'react';
import filmService from '@/services/filmService';
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { PlusCircle } from 'lucide-react';
import WatchlistService from '@/services/WatchlistService';

interface Film {
    id: number;
    title: string;
    genre: string;
    releaseDate: string;
    description: string;
    rating: number;
}
interface User {
    id: number;
    username: string;
    userid: number;
}


const FilmLijstComp: React.FC = () => {
    const [films, setFilms] = useState<Film[]>([]);
    const router = useRouter();
    const { t }=useTranslation();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [watchlist, setWatchlist] = useState<Film[] | null>(null);
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
        if (!user) {
            setError('You must be logged in to view this page.');
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

        const fetchUserRole = () => {
            const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
            if (loggedInUser) {
                setUserRole(loggedInUser.role);
            }
        };

        fetchFilms();
        fetchUserRole();
    }, []);
    const addFilmToWatchlist = async (filmId: number) => {
        try {
            if (!loggedInUser) {
                throw new Error('User not logged in');
            }
            const watchlist = await WatchlistService.getWatchlistIdByUserId(loggedInUser.userid);
            await WatchlistService.addFilmToWatchlist(watchlist.id, filmId);
            const data = await WatchlistService.getWatchlist(watchlist.id);
            setWatchlist(data);
            alert('Film added to watchlist');
        } catch (error) {
            console.error('Error adding film to watchlist:', error);
            alert('Failed to add film to watchlist');
        }
    };

    return (
        <div className="container mx-auto mt-10">
            {error && <p className="text-red-500">{error}</p>}
            {loggedInUser && (
            <><h1 className="text-2xl font-bold mb-4">{t("films.title")}</h1><table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">{t("films.titles")}</th>
                            <th className="py-2 px-4 border-b">{t("films.genre")}</th>
                            <th className="py-2 px-4 border-b">{t("films.releasedate")}</th>
                            <th className="py-2 px-4 border-b">{t("films.description")}</th>
                            <th className="py-2 px-4 border-b">{t("films.rating")}</th>
                            <th className="py-2 px-4 border-b"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {films.map((film) => (
                            <tr key={film.id}>
                                <td className="py-2 px-4 border-b">{film.title}</td>
                                <td className="py-2 px-4 border-b">{film.genre}</td>
                                <td className="py-2 px-4 border-b">{new Date(film.releaseDate).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b">{film.description}</td>
                                <td className="py-2 px-4 border-b">{film.rating}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <PlusCircle size={20} onClick={() => addFilmToWatchlist(film.id)} className="text-green-500 cursor-pointer" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table></>
            )}
            {loggedInUser && userRole === 'admin' && (
            <button 
                className="bg-oranje text-white px-4 py-2 rounded-lg shadow-md" 
                id="AddFilm"
                onClick={() => router.push('/filmLijst/createFilm')}
            >
                {t("buttons.addfilm")}
            </button>
            )}
        </div>
    );
};

export default FilmLijstComp;