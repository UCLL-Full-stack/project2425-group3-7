import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Film" RESTART IDENTITY CASCADE;');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Review" RESTART IDENTITY CASCADE;');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "Watchlist" RESTART IDENTITY CASCADE;');
    
    await prisma.user.deleteMany();
    await prisma.film.deleteMany();
    await prisma.review.deleteMany();
    await prisma.watchlist.deleteMany();
    
    
    
    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            birthday: new Date('1980-01-01'),
            password: await bcrypt.hash('admin123', 12),
            role: 'admin',
        },
    });

    const user1 = await prisma.user.create({
        data: {
            username: 'user1',
            firstName: 'User',
            lastName: 'One',
            email: 'user1@example.com',
            birthday: new Date('1990-01-01'),
            password: await bcrypt.hash('admin123', 12),
            role: 'user',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'user2',
            firstName: 'User',
            lastName: 'Two',
            email: 'user2@example.com',
            birthday: new Date('1992-02-02'),
            password: await bcrypt.hash('admin123', 12),
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

    const film3 = await prisma.film.create({
        data: {
            title: 'Interstellar',
            genre: 'Sci-Fi',
            description: 'A journey through space and time',
            releaseDate: new Date('2014-11-07'),
            rating: 4.6,
        },
    });

    const film4 = await prisma.film.create({
        data: {
            title: 'The Dark Knight',
            genre: 'Action',
            description: 'A superhero battles crime in Gotham',
            releaseDate: new Date('2008-07-18'),
            rating: 4.9,
        },
    });

    const film5 = await prisma.film.create({
        data: {
            title: 'Pulp Fiction',
            genre: 'Crime',
            description: 'A series of interconnected stories',
            releaseDate: new Date('1994-10-14'),
            rating: 4.5,
        },
    });

    const film6 = await prisma.film.create({
        data: {
            title: 'Fight Club',
            genre: 'Drama',
            description: 'An insomniac and a soap salesman form an underground fight club',
            releaseDate: new Date('1999-10-15'),
            rating: 4.4,
        },
    });

    const film7 = await prisma.film.create({
        data: {
            title: 'Forrest Gump',
            genre: 'Drama',
            description: 'The story of a man with a low IQ who achieves great things',
            releaseDate: new Date('1994-07-06'),
            rating: 4.8,
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
                connect: [
                    { id: film1.id },
                    { id: film2.id },
                ],
            },
            creationDate: new Date(),
        },
    });

    const watchlist2 = await prisma.watchlist.create({
        data: {
            userId: user2.id,
            films: {
                connect: [
                    { id: film1.id },
                    { id: film7.id },
                ],
            },
            creationDate: new Date(),
        },
    });

    console.log('Database has been seeded. 🌱');
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