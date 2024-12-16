/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Course:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            title:
 *              type: string
 *              description: Film title.
 *            genre:
 *              type: string
 *              description: Film genre.
 *            releaseDate:
 *              type: Date
 *              description: Film release date.
 *            description:
 *              type: string
 *              description: Film description.
 *            rating:  # Fixed indentation
 *              type: number
 *              description: Film rating.
 */

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
filmRouter.get('/',async (req: Request, res: Response) => {
    const films=filmService.getAllFilms();
    res.status(200).json(films);
});

filmRouter.post('addFilm',async (req: Request, res: Response) => {
    const film=filmService.addFilm(req.body);
    res.status(200).json(film);
});

export {filmRouter};