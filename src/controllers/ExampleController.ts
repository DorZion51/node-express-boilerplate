import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { getConfiguration } from '../configuration/Configuration';
import { collections } from '../db/Provider';
import Game from '../db/models/Games';
import { generateLog } from '../middleware/LogMiddleware';
import { exampleService } from '../services/ExampleService';
import { exampleValidator } from '../validators/ExampleValidator';
class ExampleController {
    private logger = generateLog(`ExampleController`);
    private validator = exampleValidator;
    doSomething = (request: Request, response: Response) => {
        const { error, value } = this.validator.doSomething.validate(request.query);
        if (error) {
            this.logger(response, StatusCodes.BAD_REQUEST, `doSomethingRoute - ${error}`);
            return;
        }
        try {
            const res = exampleService.doSomething(value);
            response.status(StatusCodes.OK).send({ res });
            return;
        } catch (error) {
            this.logger(response, StatusCodes.INTERNAL_SERVER_ERROR, `doSomethingRoute -${error}`);
            return;
        }
    };
    getGames = async (request: Request, response: Response) => {
        try {
            if (collections.games) {
                const games: Game[] = await collections.games.find({}).toArray();

                response.status(200).send(games);
            }
        } catch (error) {
            response.status(500).send(error);
        }
    };
    register = async (request: Request, response: Response) => {
        try {
            const { email, password, name } = request.body;

            // Check if the email is already registered
            const existingUser = await collections.users?.findOne({ email });
            if (existingUser) {
                return response.status(400).json({ error: 'Email already registered' });
            }

            // Create a new user
            collections.users
                ?.insertOne({ email, password, createdAt: Date.now(), name, role: 'admin' })
                .then((user) => {
                    response.status(201).json({ message: 'User registered successfully', user });
                })
                .catch((err) => {
                    response.status(500).json({ error: 'An error occurred while registering the user', err });
                });
        } catch (error) {
            console.error('Error registering user:', error);
            response.status(500).json({ error: 'An error occurred while registering the user' });
        }
    };
    login = async (request: Request, response: Response) => {
        try {
            const { email, password } = request.body;

            // Create a new user
            collections.users
                ?.findOne({ email })
                .then((user) => {
                    if (user?.password !== password) {
                        response.status(403).json({ message: 'Wrong Password' });
                        return;
                    }
                    // Generate a JWT token
                    const token = jwt.sign({ userId: user?._id }, getConfiguration().jwtSecretKey);

                    response.status(200).json({ token });
                })
                .catch((err) => {
                    response.status(500).json({ error: 'An error occurred while registering the user', err });
                    return;
                });
        } catch (error) {
            console.error('Error registering user:', error);
            response.status(500).json({ error: 'An error occurred while registering the user' });
            return;
        }
    };
}

export const exampleController = new ExampleController();
