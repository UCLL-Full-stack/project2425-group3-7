import reviewService from '../../service/review.service';
import reviewDb from '../../repository/review.db';
import filmDb from '../../repository/film.db';
import userDb from '../../repository/user.db';
import { Review } from '../../model/review';
import { Film } from '../../model/film';
import { User } from '../../model/user';

let mockReviewDbGetAllReviews: jest.SpyInstance<Promise<Review[]>, []>;
let mockReviewDbAddReview: jest.SpyInstance<Promise<Review>, [Review]>;
let mockFilmDbGetFilmById: jest.SpyInstance<Promise<Film | null>, [{ id: number }]>;
let mockUserDbGetUserById: jest.SpyInstance<Promise<User | null>, [{ id: number }]>;

beforeEach(() => {
    mockReviewDbGetAllReviews = jest.spyOn(reviewDb, 'getAllReviews');
    mockReviewDbAddReview = jest.spyOn(reviewDb, 'addReview');
    mockFilmDbGetFilmById = jest.spyOn(filmDb, 'getFilmById');
    mockUserDbGetUserById = jest.spyOn(userDb, 'getUserById');
});

afterEach(() => {
    jest.resetAllMocks();
});

test('when getting all reviews, then returns list of reviews', async () => {
    //given
    const reviews = [new Review({ 
        film: new Film({
            id: 1,
            title: "Sample Title",
            genre: "Drama",
            releaseDate: new Date(),
            description: "Sample Description",
            rating: 4.5,
            reviews: [],
        }),
        rating: 4.5, 
        comment: "Great!", 
        reviewer: new User({
            id: 1,
            username: "sampleuser",
            email: "sample@example.com",
            password: "password",
            firstName: "Sample",
            lastName: "User",
            birthday: new Date(),
            role: "user",
            reviews: [],
        })
    })];
    mockReviewDbGetAllReviews.mockResolvedValue(reviews);

    //when
    const result = await reviewService.getAllReviews();

    //then
    expect(result).toEqual(reviews);
    expect(mockReviewDbGetAllReviews).toHaveBeenCalledTimes(1);
});

test('given valid review data, when adding a review, then returns the added review', async () => {
    //given
    const film = new Film({
        id: 1,
        title: "Sample Title",
        genre: "Drama",
        releaseDate: new Date(),
        description: "Sample Description",
        rating: 4.5,
        reviews: [],
    });
    const user = new User({
        id: 1,
        username: "sampleuser",
        email: "sample@example.com",
        password: "password",
        firstName: "Sample",
        lastName: "User",
        birthday: new Date(),
        role: "user",
        reviews: [],
    });
    const reviewData = { filmId: 1, rating: 4.5, comment: "Great!", userId: 1 };
    const review = new Review({ film, rating: reviewData.rating, comment: reviewData.comment, reviewer: user });

    mockFilmDbGetFilmById.mockResolvedValue(film);
    mockUserDbGetUserById.mockResolvedValue(user);
    mockReviewDbAddReview.mockResolvedValue(review);

    //when
    const result = await reviewService.addReview(reviewData);

    //then
    expect(result).toEqual(review);
    expect(mockFilmDbGetFilmById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockReviewDbAddReview).toHaveBeenCalledTimes(1);
});

test('given invalid film ID, when adding a review, then throws an error', async () => {
    //given
    const reviewData = { filmId: -1, rating: 4.5, comment: "Great!", userId: 1 };

    mockFilmDbGetFilmById.mockResolvedValue(null);

    //when
    await expect(reviewService.addReview(reviewData)).rejects.toThrow('Film not found');

    //then
    expect(mockFilmDbGetFilmById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).not.toHaveBeenCalled();
    expect(mockReviewDbAddReview).not.toHaveBeenCalled();
});

test('given invalid user ID, when adding a review, then throws an error', async () => {
    //given
    const film = new Film({
        id: 1,
        title: "Sample Title",
        genre: "Drama",
        releaseDate: new Date(),
        description: "Sample Description",
        rating: 4.5,
        reviews: [],
    });
    const reviewData = { filmId: 1, rating: 4.5, comment: "Great!", userId: -1 };

    mockFilmDbGetFilmById.mockResolvedValue(film);
    mockUserDbGetUserById.mockResolvedValue(null);

    //when
    await expect(reviewService.addReview(reviewData)).rejects.toThrow('Reviewer not found');

    //then
    expect(mockFilmDbGetFilmById).toHaveBeenCalledTimes(1);
    expect(mockUserDbGetUserById).toHaveBeenCalledTimes(1);
    expect(mockReviewDbAddReview).not.toHaveBeenCalled();
});