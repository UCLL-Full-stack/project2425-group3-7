import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.film.deleteMany();
    await prisma.watchlist.deleteMany();
    await prisma.review.deleteMany({});
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('password', 10);

    const admin = await prisma.user.create({
        data: {
            id: 1,
            username: 'admin',
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            birthday: new Date('1980-01-01'),
            password: hashedPassword,
            role: 'admin',
        },
    });

    const user1 = await prisma.user.create({
        data: {
            id: 2,
            username: 'user1',
            firstName: 'User',
            lastName: 'One',
            email: 'user1@example.com',
            birthday: new Date('1990-01-01'),
            password: hashedPassword,
            role: 'user',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            id: 3,
            username: 'user2',
            firstName: 'User',
            lastName: 'Two',
            email: 'user2@example.com',
            birthday: new Date('1992-02-02'),
            password: hashedPassword,
            role: 'user',
        },
    });

    const film1 = await prisma.film.create({
        data: {
            title: 'Inception',
            genre: 'Sci-Fi',
            description: 'A mind-bending thriller',
            releaseDate: new Date('2010-07-16'),
            rating: 4.8,
        },
    });

    const film2 = await prisma.film.create({
        data: {
            title: 'The Matrix',
            genre: 'Action',
            description: 'A hacker discovers reality',
            releaseDate: new Date('1999-03-31'),
            rating: 4.7,
        },
    });

    const review1 = await prisma.review.create({
        data: {
            rating: 5,
            comment: 'Amazing movie!',
            reviewerId: user1.id,
            filmId: film1.id,
        },
    });

    const review2 = await prisma.review.create({
        data: {
            rating: 4,
            comment: 'Great film!',
            reviewerId: user2.id,
            filmId: film2.id,
        },
    });

    const watchlist1 = await prisma.watchlist.create({
        data: {
            userId: user1.id,
            films: {
                create: [
                    { filmId: film1.id },
                    { filmId: film2.id },
                ],
            },
            creationDate: new Date(),
        },
    });

    const watchlist2 = await prisma.watchlist.create({
        data: {
            userId: user2.id,
            films: {
                create: [
                    { filmId: film1.id },
                ],
            },
            creationDate: new Date(),
        },
    });

    console.log('Database has been seeded. 🌱');
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });