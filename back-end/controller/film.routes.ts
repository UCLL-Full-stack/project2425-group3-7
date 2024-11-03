import express, { NextFunction, Request, Response } from 'express';
import filmService from '../service/film.service';

const filmRouter = express.Router();    
/**
 * @swagger
 * /films:
 *   get:
 *     summary: Get a list of all films.
 *     responses:
 *       200:
 *         description: A list of all films.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 */
filmRouter.get('/', (req: Request, res: Response) => {
    const films=filmService.getAllFilms();
    res.status(200).json(films);
});