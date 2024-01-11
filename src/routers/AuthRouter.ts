import { Router } from 'express';
import { authController } from '../controllers/AuthController';

export const getAuthRouter = (): Router => {
    const router = Router();
    router.post('/register', authController.register);
    router.post('/login', authController.login);
    router.post('/refresh', authController.login);
    return router;
};
