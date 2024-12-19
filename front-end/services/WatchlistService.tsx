const getWatchlist = async (userId: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch watchlist');
    }
    return response.json();
};
const deleteFilmFromWatchlist = async (watchlistId: number, filmId: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${watchlistId}/film/${filmId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete film from watchlist');
    }
    return response.json();
};
const WatchlistService = {
    getWatchlist,
    deleteFilmFromWatchlist,
};

export default WatchlistService;