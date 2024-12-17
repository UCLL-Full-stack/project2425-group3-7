import Watchlist from '@/pages/watchlist';
import WatchlistService from '@/services/WatchlistService';
import React, { useEffect, useState } from 'react';

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

const WatchlistOverview: React.FC = () => {
    const [watchlist, setWatchlist] = useState<Watchlist | null>(null);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await WatchlistService.getWatchlist();
                const data = await response.json();
                setWatchlist(data);
            } catch (error) {
                console.error('Error fetching watchlist:', error);
            }
        };

        fetchWatchlist();
    }, []);


    return (
        <div>
            <h1>Your Watchlist</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Release Date</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {watchlist && watchlist.films.map((film: Film) => (
                        <tr key={film.id}>
                            <td>{film.title}</td>
                            <td>{film.genre}</td>
                            <td>{new Date(film.releaseDate).toLocaleDateString()}</td>
                            <td>{film.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WatchlistOverview;