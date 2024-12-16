import React, { useEffect, useState } from 'react';
import filmService from '@/services/filmService';

const FilmLijstComp: React.FC = () => {
    const [films, setFilms] = useState([]);

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

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Film Lijst</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Genre</th>
                        <th className="py-2 px-4 border-b">Release Date</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Rating</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FilmLijstComp;