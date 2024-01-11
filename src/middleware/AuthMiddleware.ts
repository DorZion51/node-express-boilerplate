import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getConfiguration } from '../configuration/Configuration';

export interface RequestWithUserId extends Request {
    userId?: string;
}

export const AuthenticateUser = (req: RequestWithUserId, res: Response, next: NextFunction) => {
    try {
        if (req.cookies?.access_token) {
            // const { authorization } = req.headers;
            // eslint-disable-next-line prefer-destructuring
            // const token = authorization.split(' ')[1];
            const token = req.cookies?.access_token;
            // Verify the token
            const decodedToken = jwt.verify(token, getConfiguration().jwtAccessSecretKey) as JwtPayload;

            // Attach the user ID to the request object
            req.userId = decodedToken.userId;

            next();
        } else {
            console.error('Error authenticating');
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};
