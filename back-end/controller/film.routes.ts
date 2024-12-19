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
    const films=await filmService.getAllFilms();
    res.status(200).json(films);
    
});

filmRouter.post('/addFilm', async (req: Request, res: Response) => {
    try {
        const film = await filmService.addFilm(req.body);
        res.status(201).json(film);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add film', error });
    }
});
/**
 * @swagger
 * /films/{id}:
 *   get:
 *     summary: Get a film by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The film ID.
 *     responses:
 *       200:
 *         description: A film object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       404:
 *         description: Film not found.
 */
filmRouter.get('/:filmId', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const film = await filmService.getFilmByID({ id });
        if (film) {
            res.status(200).json(film);
        } else {
            res.status(404).json({ message: 'Film not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to get film', error });
    }
});
export {filmRouter};