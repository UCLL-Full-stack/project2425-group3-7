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
 *            role:
 *              type: string
 *              description: The user's role.
 */
import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

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
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

/**
* @swagger
* /users/login:
*   post:
*     security:
*        - bearerAuth: [] 
*     summary: Authenticate a user.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*               password:
*                 type: string
*     responses:
*       200:
*         description: Authentication successful.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 token:
*                   type: string
*                 username:
*                   type: string
*                 fullname:
*                   type: string
*                 role:
*                   type: string
*                 userid:
*                   type: integer
*       401:
*         description: Authentication failed.
*/
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    } catch (error) {
        next(error);
    }
});
export {userRouter};