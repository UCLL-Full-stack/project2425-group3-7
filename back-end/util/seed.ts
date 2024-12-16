
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.film.deleteMany();
    await prisma.watchlist.deleteMany();
    await prisma.review.deleteMany({});
    await prisma.user.deleteMany();

    const Admin = await prisma.user.create({
        data: {
        id: 1,
        username: 'user1',
        firstName: 'User',
        lastName: 'One',
        email: 'user1.user@email.com',
        birthday: new Date('1990-01-01'),
        password: 'password',
        role: 'admin',
        },
    });

    const User2 = await prisma.user.create({
        data: {
        id: 2,
        username: 'user2',
        firstName: 'User',
        lastName: 'Two',
        email: '',
        birthday: new Date('1990-01-01'),
        password: 'password',
        role: 'user',
        },
    });
};


(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
