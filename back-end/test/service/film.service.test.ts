import filmService from '../../service/film.service';
import filmDb from '../../repository/film.db';
import { Film } from '../../model/film';

let mockFilmDbGetAllFilms: jest.SpyInstance<Promise<Film[]>, []>;
let mockFilmDbGetFilmByID: jest.SpyInstance<Promise<Film | null>, [{ id: number }]>;
let mockFilmDbAddFilm: jest.SpyInstance<Promise<Film>, [Film]>;

beforeEach(() => {
    mockFilmDbGetAllFilms = jest.spyOn(filmDb, 'getAllFilms');
    mockFilmDbGetFilmByID = jest.spyOn(filmDb, 'getFilmById');
    mockFilmDbAddFilm = jest.spyOn(filmDb, 'addFilm');
});

afterEach(() => {
    jest.resetAllMocks();
});

test('when getting all films, then returns list of films', async () => {
    //given
    const films = [new Film({ title: "Cars", genre: "Animation", releaseDate: new Date("2006-06-09"), description: "Description", rating: 4.13, reviews: [] })];
    mockFilmDbGetAllFilms.mockResolvedValue(films);

    //when
    const result = await filmService.getAllFilms();

    //then
    expect(result).toEqual(films);
    expect(mockFilmDbGetAllFilms).toHaveBeenCalledTimes(1);
});

test('given a valid ID, when getting film by ID, then returns film', async () => {
    //given
    const film = new Film({ title: "Cars", genre: "Animation", releaseDate: new Date("2006-06-09"), description: "Description", rating: 4.13, reviews: [] });
    mockFilmDbGetFilmByID.mockResolvedValue(film);

    //when
    const result = await filmService.getFilmByID({ id: 1 });

    //then
    expect(result).toEqual(film);
    expect(mockFilmDbGetFilmByID).toHaveBeenCalledTimes(1);
});

test('given valid film data, when adding a film, then returns the added film', async () => {
    //given
    const filmData = { title: "Cars", genre: "Animation", releaseDate: new Date("2006-06-09"), description: "Description", rating: 4.13 };
    const film = new Film({ ...filmData, reviews: [] });
    mockFilmDbAddFilm.mockResolvedValue(film);

    //when
    const result = await filmService.addFilm(filmData);

    //then
    expect(result).toEqual(film);
    expect(mockFilmDbAddFilm).toHaveBeenCalledTimes(1);
    expect(mockFilmDbAddFilm).toHaveBeenCalledWith(expect.any(Film));
});

