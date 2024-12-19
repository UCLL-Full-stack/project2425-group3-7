import React, { useEffect, useState } from 'react';
import filmService from '@/services/filmService';
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';

interface Film {
    id: number;
    title: string;
    genre: string;
    releaseDate: string;
    description: string;
    rating: number;
}

const FilmLijstComp: React.FC = () => {
    const [films, setFilms] = useState<Film[]>([]);
    const router = useRouter();
    const { t }=useTranslation();
    
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
            <h1 className="text-2xl font-bold mb-4">{t("films.title")}</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">{t("films.titles")}</th>
                        <th className="py-2 px-4 border-b">{t("films.genre")}</th>
                        <th className="py-2 px-4 border-b">{t("films.releasedate")}</th>
                        <th className="py-2 px-4 border-b">{t("films.description")}</th>
                        <th className="py-2 px-4 border-b">{t("films.rating")}</th>
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
            <button 
                className="bg-oranje text-white px-4 py-2 rounded-lg shadow-md" 
                id="AddFilm"
                onClick={() => router.push('/filmLijst/createFilm')}
            >
                {t("buttons.addfilm")}
            </button>
        </div>
    );
};

export default FilmLijstComp;