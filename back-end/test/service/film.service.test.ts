import filmService from '../../service/film.service';
import filmDb from '../../repository/film.db';
import { Film } from '../../model/film';

let mockFilmDbGetAllFilms: jest.SpyInstance<Film[], []>;
let mockFilmDbGetFilmByID: jest.SpyInstance<Film | null, [{ id: number }]>;

beforeEach(() => {
    mockFilmDbGetAllFilms = jest.spyOn(filmDb, 'getAllFilms');
    mockFilmDbGetFilmByID = jest.spyOn(filmDb, 'getFilmByID');
});

afterEach(() => {
    jest.resetAllMocks();
});

test('when getting all films, then returns list of films', () => {
    //given
    const films = [new Film({ title: "Cars", genre: "Animation", releasedate: new Date("2006-06-09"), description: "Description", rating: 4.13 })];
    mockFilmDbGetAllFilms.mockReturnValue(films);

    //when
    const result = filmService.getAllFilms();

    //then
    expect(result).toEqual(films);
    expect(mockFilmDbGetAllFilms).toHaveBeenCalledTimes(1);
});

test('given a valid ID, when getting film by ID, then returns film', () => {
    //given
    const film = new Film({ title: "Cars", genre: "Animation", releasedate: new Date("2006-06-09"), description: "Description", rating: 4.13 });
    mockFilmDbGetFilmByID.mockReturnValue(film);

    //when
    const result = filmService.getFilmByID({ id: 1 });

    //then
    expect(result).toEqual(film);
    expect(mockFilmDbGetFilmByID).toHaveBeenCalledTimes(1);
});

test('given an invalid ID, when getting film by ID, then returns null', () => {
    const result = filmService.getFilmByID({ id: -1 });
    expect(result).toBeNull();
});

test('given a non-existent film ID, when getting film by ID, then throws "Film not found"', () => {
    mockFilmDbGetFilmByID.mockReturnValue(null);

    expect(() => filmService.getFilmByID({ id: 999 })).toThrow('Film not found');
});
