import React, { useEffect, useState } from 'react';
import WatchlistService from '../../services/WatchlistService';
import { log } from 'console';
import {Trash2} from "lucide-react";

interface Film {
    id: number;
    title: string;
    genre: string;
    releaseDate: string;
    rating: number;
}

interface Watchlist {
    id: number;
    films: Film[];
    creationDate: string;
}

interface User {
    id: number;
    username: string;
    userid: number;
}

const WatchlistOverview: React.FC = () => {
    const [watchlist, setWatchlist] = useState<Watchlist | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser") as string);
        if (!user || user.role === 'guest') {
            setError("You must be logged in to view this page.");
        } else {
            setLoggedInUser(user);
        }
    }, []);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                if (!loggedInUser) {
                    throw new Error('User not logged in');
                }
                const data = await WatchlistService.getWatchlist(loggedInUser.userid);
                setWatchlist(data);
            } catch (error) {
                console.error('Error fetching watchlist:', error);
                setError('Failed to fetch watchlist');
            }
        };

        if (loggedInUser) {
            fetchWatchlist();
        }
    }, [loggedInUser]);
    const deleteFilmFromWatchlist = async (watchlistId:number,filmId: number) => {
        if (!loggedInUser || !watchlist) return;

        try {
            await WatchlistService.deleteFilmFromWatchlist(watchlistId, filmId);
            setWatchlist({
                ...watchlist,
                films: watchlist.films.filter(film => film.id !== filmId)
            });
        } catch (error) {
            console.error('Error deleting film from watchlist:', error);
            setError('Failed to delete film from watchlist');
        }
    };
    
        return (
            <div className="container mx-auto mt-10">
            {error && <div className="text-red-800">{error}</div>}
            {loggedInUser && (
                <>
                    <h1 className="text-2xl font-bold mb-4">Your Watchlist</h1>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Title</th>
                                <th className="py-2 px-4 border-b">Genre</th>
                                <th className="py-2 px-4 border-b">Release Date</th>
                                <th className="py-2 px-4 border-b">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlist && watchlist.films.map((film: Film) => (
                                <tr key={film.id}>
                                    <td className="py-2 px-4 border-b">{film.title}</td>
                                    <td className="py-2 px-4 border-b">{film.genre}</td>
                                    <td className="py-2 px-4 border-b">{new Date(film.releaseDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b">{film.rating}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Trash2 size={20} onClick={() => {deleteFilmFromWatchlist(watchlist.id, film.id)}} className="text-red-500" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default WatchlistOverview;