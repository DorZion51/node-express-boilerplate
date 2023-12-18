import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getConfiguration } from '../configuration/Configuration';
import { logger } from '../configuration/logging/Logger';

export const getLogMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Log the request method and URL
    const body = Object.keys(req.body).length > 0 ? req.body : '';
    const query = Object.keys(req.query).length > 0 ? req.query : '';
    const params = Object.keys(req.params).length > 0 ? req.params : '';

    // logger.info(`Request - ${req.url}`, { method: req.method, baseUrl: req.baseUrl, body, query, params });
    const addtionalReqParams = { method: req.method, baseUrl: req.baseUrl, body, query, params };
    // Capture the response finish event to log response details
    res.on('finish', () => {
        // Log the response status code and response time with metadata
        const { message } = res.locals; // Get the error message from res.locals
        if (req.url !== '/') {
            if (res.statusCode >= 100 && res.statusCode < 200) {
                logger(getConfiguration()).info(`Response Informational - ${req.url}`, {
                    ...addtionalReqParams,
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    contentLength: res.get('Content-Length') || 0,
                    responseTime: `${res.get('X-Response-Time')}`,
                    infoMessage: message,
                });
            } else if (res.statusCode >= 200 && res.statusCode < 300) {
                logger(getConfiguration()).info(`Response Success - ${req.url}`, {
                    ...addtionalReqParams,
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    contentLength: res.get('Content-Length') || 0,
                    responseTime: `${res.get('X-Response-Time')}`,
                    infoMessage: message,
                });
            } else if (res.statusCode >= 300 && res.statusCode < 400) {
                logger(getConfiguration()).info(`Response Redirection - ${req.url}`, {
                    ...addtionalReqParams,
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    contentLength: res.get('Content-Length') || 0,
                    responseTime: `${res.get('X-Response-Time')}`,
                    infoMessage: message,
                });
            } else if (res.statusCode >= 400 && res.statusCode < 500) {
                logger(getConfiguration()).error(`Response Client Error - ${req.url}`, {
                    ...addtionalReqParams,
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    contentLength: res.get('Content-Length') || 0,
                    responseTime: `${res.get('X-Response-Time')}`,
                    errorMessage: message,
                });
            } else if (res.statusCode >= 500 && res.statusCode < 600) {
                logger(getConfiguration()).error(`Response Server Error - ${req.url}`, {
                    ...addtionalReqParams,
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    contentLength: res.get('Content-Length') || 0,
                    responseTime: `${res.get('X-Response-Time')}`,
                    errorMessage: message,
                });
            }
        }
    });

    next();
};

export const generateLog =
    (controllerName: string) => (response: Response, statusCode: StatusCodes, message: string) => {
        response.locals.message = `Error on - ${controllerName} -> ${message}`;
        response.status(statusCode).send({ error: response.statusMessage });
    };
