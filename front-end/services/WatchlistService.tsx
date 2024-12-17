const getWatchlist = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/watchlist", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
const WatchlistService = {
    getWatchlist,
};
export default WatchlistService;