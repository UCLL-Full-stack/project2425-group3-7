import { Film } from '../model/film';

const films = [
    new Film({
        id: 1,
        title: 'Cars',
        genre: 'Animation',
        releasedate: new Date('2006-06-09'),
        description: 'A racecar named Lightning McQueen gets waylaid in Radiator Springs, where he finds the true meaning of friendship and family.',
        rating: 4.13,
    }),
    new Film({
        id: 2,
        title: 'Toy Story',
        genre: 'Animation',
        releasedate: new Date('1995-11-22'),
        description: 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him',
        rating: 4.3,
    }),
];
const getAllFilms = (): Film[] => {
    return films;
};
const getFilmByID = ({ id }: { id: number }): Film | null => {
    try {
        return films.find((film) => film.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default {getAllFilms,getFilmByID};