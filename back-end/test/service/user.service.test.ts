import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import { User } from '../../model/user';

let mockUserDbGetAllUsers: jest.SpyInstance<Promise<User[]>, []>;
let mockUserDbGetUserByID: jest.SpyInstance<Promise<User | null>, [{ id: number }]>;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.spyOn(userDb, 'getAllUsers');
    mockUserDbGetUserByID = jest.spyOn(userDb, 'getUserById');
});

afterEach(() => {
    jest.resetAllMocks();
});

test('when getting all users, then returns list of users', async () => {
    //given
    const users = [new User({ username: "johndoe", firstName: "John", lastName: "Doe", email: "john.doe@example.com", birthday: new Date("2000-01-01"), password: "password", role: "user", reviews: []})];
    mockUserDbGetAllUsers.mockResolvedValue(users);

    //when
    const result = await userService.getAllUsers();

    //then
    expect(result).toEqual(users);
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
});
