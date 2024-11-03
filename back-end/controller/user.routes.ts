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
 *            username:
 *              type: string
 *              description: User username.
 *            firstName:
 *              type: string
 *              description: User first name.
 *            lastName:
 *              type: string
 *              description: User last name.
 *            email:
 *              type: string
 *              format: email
 *              description: User email.
 *            birtday:
 *              type: string
 *              format: date
 *              description: User birthday.
 *            password:
 *              type: string
 *              description: User password.
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();    
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     responses:
 *       200:
 *         description: A list of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response) => {
    const users=userService.getAllUsers();
    res.status(200).json(users);
});
export {userRouter};