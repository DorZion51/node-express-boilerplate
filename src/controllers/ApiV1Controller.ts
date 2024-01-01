import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { generateLog } from '../middleware/LogMiddleware';
import { apiV1Service } from '../services/ApiV1Service';
import { apiV1Validator } from '../validators/ApiV1Validator';

class ApiV1Controller {
    private logger = generateLog(`ApiV1Controller`);
    private validator = apiV1Validator;

    getReq = (request: Request, response: Response) => {
        const { error, value } = this.validator.getReq.validate(request.query);
        if (error) {
            this.logger(response, StatusCodes.BAD_REQUEST, `getReq - ${error}`);
            return;
        }
        try {
            const res = apiV1Service.doSomething(value);
            response.status(StatusCodes.OK).send({ res });
            return;
        } catch (error) {
            this.logger(response, StatusCodes.INTERNAL_SERVER_ERROR, `getReq -${error}`);
            return;
        }
    };

    postReq = async (request: Request, response: Response) => {
        const { error, value } = this.validator.postReq.validate(request.body);
        if (error) {
            this.logger(response, StatusCodes.BAD_REQUEST, `postReq - ${error}`);
            return;
        }
        try {
            const res = apiV1Service.doSomething2(value);
            response.status(StatusCodes.OK).send({ res });
            return;
        } catch (error) {
            this.logger(response, StatusCodes.INTERNAL_SERVER_ERROR, `postReq -${error}`);
            return;
        }
    };
}

export const apiV1Controller = new ApiV1Controller();
