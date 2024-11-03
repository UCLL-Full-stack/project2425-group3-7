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
 *            film:
 *              $ref: '#/components/schemas/Film'
 *              description: The film being reviewed.
 *            rating:
 *              type: number
 *              description: Rating user gave to movie.
 *            comment:
 *              type: string
 *              description: Review comment.
 *            reviewer:
 *             $ref: '#/components/schemas/User'
 *             description: The user who wrote the review.
 */
import express, { NextFunction, Request, Response } from 'express';
import reviewService from '../service/review.service';

const reviewRouter = express.Router();    
/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get a list of all reviews.
 *     responses:
 *       200:
 *         description: A list of all reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
reviewRouter.get('/',async (req: Request, res: Response) => {
    const reviews=reviewService.getAllReviews();
    res.status(200).json(reviews);
});

export {reviewRouter};