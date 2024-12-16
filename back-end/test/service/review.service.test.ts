import reviewService from '../../service/review.service';
import reviewDb from '../../repository/review.db';
import { Review } from '../../model/review';
import { id } from 'date-fns/locale';
import { Film } from '../../model/film';
import { User } from '../../model/user';

let mockReviewDbGetAllReviews: jest.SpyInstance<Review[], []>;

beforeEach(() => {
    mockReviewDbGetAllReviews = jest.spyOn(reviewDb, 'getAllReviews');
});

afterEach(() => {
    jest.resetAllMocks();
});

test('when getting all reviews, then returns list of reviews', () => {
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
            username: "slimmerik",
            firstName: "Slimme",
            lastName: "Rik",
            email: "slimme.rik@gmail.com",
            birthday: new Date("2000-01-01"),
            password: "validPassword123",
            role: "user",
            reviews: [],
        }),
    })];
    mockReviewDbGetAllReviews.mockReturnValue(reviews);

    const result = reviewService.getAllReviews();

    expect(result).toEqual(reviews);
    expect(mockReviewDbGetAllReviews).toHaveBeenCalledTimes(1);
});

test('when database error occurs on getAllReviews, then throws error', () => {
    mockReviewDbGetAllReviews.mockImplementation(() => { throw new Error('Database error'); });

    expect(() => reviewService.getAllReviews()).toThrow('Database error. See server log for details.');
});
