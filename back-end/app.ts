import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {filmRouter} from './controller/film.routes';
import {reviewRouter} from './controller/review.routes';
import {userRouter} from './controller/user.routes';
import { watchlistRouter } from './controller/watchlist.routes';
const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/films', filmRouter);
app.use('/reviews', reviewRouter);
app.use('/users', userRouter);
app.use('/watchlist', watchlistRouter);
app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
