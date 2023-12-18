/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Configuration } from '../configuration/Configuration';

export const getCorsMiddleware =
    (configuration: Configuration) =>
    (request: Request, response: Response, next: NextFunction): void => {
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Credentials', 'true');
        response.set(
            'Access-Control-Allow-Headers',
            'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        );
        response.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        response.set('Access-Control-Max-Age', '86400');

        next();
    };
