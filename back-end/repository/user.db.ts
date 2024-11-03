import { get } from "http";
import { User } from "../model/user";

const users = [
    new User({
        id: 1,
        username: 'user1',
        firstName: 'User',
        lastName: 'One',
        email: '',
        birthday: new Date('1990-01-01'),
        password: 'password',
    }),
    new User({
        id: 2,
        username: 'user2',
        firstName: 'User',
        lastName: 'Two',
        email: '',
        birthday: new Date('1990-01-01'),
        password: 'password',
    }),
];
const getAllUsers = (): User[] => {
    return users;
};
const getUserByID = ({ id }: { id: number }): User | null => {
    try {
        return users.find((user) => user.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default {getAllUsers,getUserByID};