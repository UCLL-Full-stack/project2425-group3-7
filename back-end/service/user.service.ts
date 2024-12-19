import { User } from "../model/user";
import userDb from "../repository/user.db";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../util/jwt";
import { AuthenticationResponse, UserInput } from "../types";

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();


const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    if (id <= 0) {
        return null;
    }
    const user = await userDb.getUserById({id});
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

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    return await userDb.getUserByUsername({ username });
}

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    if (!user) {
        throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
        userid: user.getId() ?? 0
    };
};

export default { getAllUsers, getUserById, getUserByUsername, authenticate };