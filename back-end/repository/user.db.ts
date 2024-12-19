import { User } from "../model/user";
import database from './database';


const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany(
            {
                include: {
                    reviews: true,
                }
            }
        );
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        if (!id) {
            throw new Error('User ID is required');
        }
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: {
                reviews: true,
            },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username },
            include: {
                reviews: true,
            },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default {getAllUsers,getUserById,getUserByUsername};