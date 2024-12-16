import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import { User } from '../../model/user';

let mockUserDbGetAllUsers: jest.SpyInstance<User[], []>;
let mockUserDbGetUserByID: jest.SpyInstance<User | null, [{ id: number }]>;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.spyOn(userDb, 'getAllUsers');
    mockUserDbGetUserByID = jest.spyOn(userDb, 'getUserByID');
});

afterEach(() => {
    jest.resetAllMocks();
});

test('when getting all users, then returns list of users', () => {
    const users = [new User({ username: "johndoe", firstName: "John", lastName: "Doe", email: "john.doe@example.com", birthday: new Date("2000-01-01"), password: "password", role: "user", reviews: [] })];
    mockUserDbGetAllUsers.mockReturnValue(users);

    const result = userService.getAllUsers();

    expect(result).toEqual(users);
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
});

test('given a valid ID, when getting user by ID, then returns user', () => {
    const user = new User({ username: "johndoe", firstName: "John", lastName: "Doe", email: "john.doe@example.com", birthday: new Date("2000-01-01"), password: "password", role: "user", reviews: [] });
    mockUserDbGetUserByID.mockReturnValue(user);

    const result = userService.getUserByID({ id: 1 });

    expect(result).toEqual(user);
    expect(mockUserDbGetUserByID).toHaveBeenCalledTimes(1);
});

test('given an invalid ID, when getting user by ID, then returns null', () => {
    const result = userService.getUserByID({ id: -1 });
    expect(result).toBeNull();
});

test('given a non-existent user ID, when getting user by ID, then throws "User not found"', () => {
    mockUserDbGetUserByID.mockReturnValue(null);

    expect(() => userService.getUserByID({ id: 999 })).toThrow('User not found');
});
