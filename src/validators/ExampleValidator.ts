import Joi from 'joi';
import { DoSomethingQueryParams } from '../models/ExampleTypes';

class ExampleValidator {
    doSomething = Joi.object<DoSomethingQueryParams>({
        someParam: Joi.string(),
    });
}

export const exampleValidator = new ExampleValidator();
