import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getConfiguration } from '../configuration/Configuration';
import { collections } from '../db/Provider';
class AuthController {
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
                    const accessToken = jwt.sign({ userId: user?._id }, getConfiguration().jwtAccessSecretKey, {
                        expiresIn: '4h',
                    });
                    const refreshToken = jwt.sign({ userId: user?._id }, getConfiguration().jwtRefreshSecretKey, {
                        expiresIn: '1d',
                    });

                    response.cookie('refresh_token', refreshToken, {
                        httpOnly: true,
                        sameSite: 'none',
                        secure: true,
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    response.cookie('access_token', accessToken, {
                        httpOnly: true,
                        sameSite: 'none',
                        secure: true,
                        maxAge: 4 * 60 * 60 * 1000,
                    });
                    response.status(200).json({ accessToken, refreshToken });
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

    refresh = async (request: Request, response: Response) => {
        try {
            if (request.cookies?.refresh_token) {
                // Destructuring refreshToken from cookie
                const refreshToken = request.cookies.refresh_token;

                // Verifying refresh token
                jwt.verify(refreshToken, getConfiguration().jwtRefreshSecretKey, (err: any, decoded: any) => {
                    if (err) {
                        // Wrong Refesh Token
                        return response.status(406).json({ message: 'Unauthorized' });
                    } else {
                        // Correct token we send a new access token
                        const accessToken = jwt.sign(
                            {
                                userId: decoded.user?._id,
                            },
                            getConfiguration().jwtAccessSecretKey,
                            {
                                expiresIn: '4h',
                            },
                        );
                        return response.json({ accessToken });
                    }
                });
            } else {
                return response.status(406).json({ message: 'Unauthorized' });
            }
        } catch (error) {
            console.error('Error registering user:', error);
            response.status(500).json({ error: 'An error occurred while registering the user' });
            return;
        }
    };
}

export const authController = new AuthController();
