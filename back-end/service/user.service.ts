import { User } from "../model/user";
import userDb from "../repository/user.db";

const getAllUsers = (): User[] => {
    return userDb.getAllUsers();
}
const getUserByID = ({ id }: { id: number }): User | null => {
    if (id <= 0) {
        return null;
    }
    const user = userDb.getUserByID({id});
    if (!user) {
        throw new Error('User not found');
    }
    try {
        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
export default {getAllUsers,getUserByID};