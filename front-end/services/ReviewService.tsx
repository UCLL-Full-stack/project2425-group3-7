const getAllReviews = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
export default { getAllReviews };