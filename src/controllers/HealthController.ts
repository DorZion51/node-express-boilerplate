import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const GetHealthRoute = (request: Request, response: Response): Promise<void> | undefined => {
    response.sendStatus(StatusCodes.OK);
    return;
};
