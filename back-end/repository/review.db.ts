import { Review } from "../model/review";
import { User } from "../model/user";
import getUserByID from "../service/user.service"; // Adjust the path as necessary
import getFilmByID from "../service/film.service";
import { Film } from "../model/film";
import userDb from "./user.db";
import filmDb from "./film.db";

const reviews = [
    new Review({
        id: 1,
        film: getFilmByID.getFilmByID({id: 1}) as Film,
        reviewer: userDb.getUserByID({id: 1}) as User,
        rating: 5,
        comment: 'This is a great movie!',
    }),
    new Review({
        id: 2,
        film: filmDb.getFilmByID({id: 2}) as Film,
        reviewer: userDb.getUserByID({id: 2}) as User,
        rating: 4,
        comment: 'I enjoyed this movie.',
    }),
];
const getAllReviews = (): Review[] => {
    return reviews;
};
export default {getAllReviews};
