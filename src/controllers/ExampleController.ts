import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
}

export const exampleController = new ExampleController();
