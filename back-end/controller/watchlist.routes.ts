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
 * /watchlist/{userId}:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     summary: Get a watchlist by user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: A watchlist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Watchlist'
 *       404:
 *         description: Watchlist not found.
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
/**
 * @swagger
 * /watchlist/{watchlistId}/film/{filmId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a film from a watchlist.
 *     parameters:
 *       - in: path
 *         name: watchlistId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the watchlist.
 *       - in: path
 *         name: filmId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the film to delete.
 *     responses:
 *       200:
 *         description: Film deleted from watchlist.
 *       500:
 *         description: Failed to delete film from watchlist.
 */
watchlistRouter.delete('/:watchlistId/film/:filmId', async (req: Request, res: Response) => {
    try {
        const watchlistId = parseInt(req.params.watchlistId, 10);
        const filmId = parseInt(req.params.filmId, 10);
        await watchlistService.deleteFilmFromWatchlist(watchlistId, filmId);
        res.status(200).json({ message: 'Film deleted from watchlist' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete film from watchlist', error });
    }
});
/**
 * @swagger
 * /watchlist/{watchlistId}/film/{filmId}:
 *   post:
 *     security:
 *       - bearerAuth: [] 
 *     summary: Add a film to a watchlist.
 *     parameters:
 *       - in: path
 *         name: watchlistId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The watchlist ID.
 *       - in: path
 *         name: filmId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The film ID.
 *     responses:
 *       200:
 *         description: Film added to watchlist.
 *       500:
 *         description: Failed to add film to watchlist.
 */
watchlistRouter.post('/:watchlistId/film/:filmId', async (req: Request, res: Response) => {
    try {
        const watchlistId = parseInt(req.params.watchlistId, 10);
        const filmId = parseInt(req.params.filmId, 10);
        await watchlistService.addFilmToWatchlist(watchlistId, filmId);
        res.status(200).json({ message: 'Film added to watchlist' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add film to watchlist', error });
    }
});
/**
 * @swagger
 * /watchlist/user/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: [] 
 *     summary: Get a watchlistid by user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: A watchlist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Watchlist'
 *       404:
 *         description: Watchlist not found.
 */
watchlistRouter.get('/user/:userId', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const watchlist = await watchlistService.getWatchlistIdByUserId(userId);
        res.status(200).json(watchlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch watchlist ID', error });
    }
});
export {watchlistRouter};