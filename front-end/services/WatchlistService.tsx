const getWatchlist = async (userId: string) => {
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

const WatchlistService = {
    getWatchlist,
};

export default WatchlistService;