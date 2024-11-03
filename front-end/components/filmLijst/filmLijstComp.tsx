type Props = {};

const FilmLijstComp: React.FC<Props> = (Props) => {
    return (
        <>
            <div className="flex flex-col space-y-4 mx-auto w-9/12 bg-white p-6 rounded-xl shadow-lg mt-10">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex-shrink-0">
                        <a href="addFilm">
                            <button className="p-4 bg-oranje text-white rounded-lg shadow h-12 flex justify-center items-center">
                                Add
                            </button>
                        </a>
                    </div>
                </div>
                {/* Placeholder for future films */}
                <div className="p-4 bg-gray-100 rounded-lg shadow max-w-md max-h-64 overflow-hidden border">
                    <a href="/filmInhoud">
                        <div className="truncate font-bold">Film 1</div>
                    </a>
                    <p className="truncate">
                        random text abcdefghijklmnopqrstuvwxyz 1234567890
                    </p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow max-w-md max-h-64 overflow-hidden border">
                    <a href="/filmInhoud">
                        <div className="truncate font-bold">Film 2</div>
                    </a>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow max-w-md max-h-64 overflow-hidden border">
                    <a href="/filmInhoud">
                        <div className="truncate font-bold">Film 3</div>
                    </a>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow max-w-md max-h-64 overflow-hidden border">
                    <a href="/filmInhoud">
                        <div className="truncate font-bold">Film 4</div>
                    </a>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow max-w-md max-h-64 overflow-hidden border">
                    <a href="/filmInhoud">
                        <div className="truncate font-bold">Film 5</div>
                    </a>
                </div>
            </div>
        </>
    );
};

export default FilmLijstComp;