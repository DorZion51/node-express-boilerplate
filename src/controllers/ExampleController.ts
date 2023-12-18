import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
}

export const exampleController = new ExampleController();
