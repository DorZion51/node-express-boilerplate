import Joi from 'joi';
import { GetQueryParams, PostBodyParams } from '../models/ApiV1Types';

class ApiV1Validator {
    getReq = Joi.object<GetQueryParams>({
        someParam: Joi.string(),
    });
    postReq = Joi.object<PostBodyParams>({
        someParam: Joi.number(),
    });
}

export const apiV1Validator = new ApiV1Validator();
