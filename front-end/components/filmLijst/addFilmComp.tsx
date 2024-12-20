import filmService from "@/services/filmService";
import { User } from "@/types";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

const AddFilmComp = () => {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState<number | "">("");
    const [error, setError] = useState("");
    const { t }=useTranslation();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    useEffect(() => {
            const user = JSON.parse(sessionStorage.getItem('loggedInUser') as string);
            if (!user) {
                setError('You must be logged in to view this page.');
            } else {
                setLoggedInUser(user);
            }
        }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let isError = false;
        setError("");

        if (title.trim() === "") {
            setError("Title is required");
            isError = true;
        }
        if (genre.trim() === "") {
            setError("Genre is required");
            isError = true;
        }
        if (releaseDate.trim() === "") {
            setError("Release date is required");
            isError = true;
        }
        if (description.trim() === "") {
            setError("Description is required");
            isError = true;
        }
        if (rating === "" || rating < 0 || rating > 5) {
            setError("Rating is required and must be between 0 and 5");
            isError = true;
        }

        if (isError) {
            return;
        }

        try {
            await filmService.addFilmToList({ title, genre, releaseDate: new Date(releaseDate), description, rating: Number(rating) });
            setTitle("");
            setGenre("");
            setReleaseDate("");
            setDescription("");
            setRating("");
        } catch (error) {
            setError("Failed to add film");
        }
    };

    const handleButtonClick = (event: React.MouseEvent) => {
        event.preventDefault();
        setTitle("");
        setGenre("");
        setReleaseDate("");
        setDescription("");
        setRating("");
    };

    return (
        <div className="container mx-auto mt-10">
        {error && <div className="text-red-800">{error}</div>}
        {loggedInUser && loggedInUser.role == "admin" && (
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 mx-auto mb-12 w-80 bg-white p-6 rounded-xl shadow-lg mt-10"
            >
                {error && <span className="text-red-500 font-bold">{error}</span>}

                <label htmlFor="title" className="text-sm font-medium">
                {t("films.titles")}
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <label htmlFor="genre" className="text-sm font-medium">
                {t("films.genre")}
                </label>
                <input
                    type="text"
                    id="genre"
                    value={genre}
                    onChange={(event) => setGenre(event.target.value)}
                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <label htmlFor="releaseDate" className="text-sm font-medium">
                {t("films.releasedate")}
                </label>
                <input
                    type="date"
                    id="releaseDate"
                    value={releaseDate}
                    onChange={(event) => setReleaseDate(event.target.value)}
                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <label htmlFor="description" className="text-sm font-medium">
                {t("films.description")}
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <label htmlFor="rating" className="text-sm font-medium">
                {t("films.rating")}
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

                <div className="flex justify-around mt-6">
                    <button className="bg-oranje text-white px-4 py-2 rounded-lg shadow-md" id="Cancel" onClick={handleButtonClick}>
                        {t("buttons.cancel")}
                    </button>

                    <button className="bg-oranje text-white px-4 py-2 rounded-lg shadow-md" id="Save" type="submit">
                    {t("buttons.submit")}
                    </button>
                </div>
            </form>
        )}
        </div>
    );
};

export default AddFilmComp;