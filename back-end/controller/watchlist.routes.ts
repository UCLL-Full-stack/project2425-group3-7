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
 *            films:
 *              type: array
 *              items: 
 *               $ref: '#/components/schemas/Film'
 *              description: A list of films included in the watchlist.
 *            user:
 *              $ref: '#/components/schemas/User'
 *              description: The user who owns the watchlist.
 *            creationDate:
 *              type: string
 *              format: date
 *              description: The date when the watchlist was created.
 */
import express, { NextFunction, Request, Response } from 'express';
import watchlistService from '../service/watchlist.service';

const watchlistRouter = express.Router();    
/**
 * @swagger
 * /watchlist:
 *   get:
 *     summary: Get a list of all watchlists.
 *     responses:
 *       200:
 *         description: A list of all watchlists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Watchlist'
 */
watchlistRouter.get('/:userId', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const watchlist = await watchlistService.getWatchlistByUserId(userId);
        res.status(200).json(watchlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch watchlist', error });
    }
});
export {watchlistRouter};