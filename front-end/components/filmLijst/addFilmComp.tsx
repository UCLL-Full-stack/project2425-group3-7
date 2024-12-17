import filmService from "@/services/filmService";
import React, { useState } from "react";

const AddFilmComp = () => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        let isError = false;

        setError("");

        if (title.trim() === "") {
            setError("Titel veld is verplicht");
            isError = true;
        }

        if (isError) {
            return;
        }

        filmService.addFilmToList(title);

        setTitle("");
    };

    const handleButtonClick = (event: React.MouseEvent) => {
        event.preventDefault();
        console.log("Button clicked");

        setTitle("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 mx-auto mb-12 w-80 bg-white p-6 rounded-xl shadow-lg mt-10"
        >
            {error && <span className="text-red-500 font-bold">{error}</span>}

            <label className="flex flex-col space-y-2">
                <span className="text-gray-600 font-semibold">Film titel</span>
                <input 
                    type="text"
                    className="border border-gray-300 p-3 rounded-lg shadow-sm"
                    id="Title-Add"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}    
                />
            </label>

            <div className="flex justify-around mt-6">
                <button className="bg-oranje text-white px-4 py-2 rounded-lg shadow-md" id="Cancel" onClick={handleButtonClick}>
                    Cancel
                </button>

                <button className="bg-oranje text-white px-4 py-2 rounded-lg shadow-md" id="Save" type="submit">
                    Save
                </button>
            </div>
        </form>
    )
};
export default AddFilmComp;