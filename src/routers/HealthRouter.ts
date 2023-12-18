import { Router } from 'express';
import { GetHealthRoute } from '../controllers/HealthController';

export const getHealthRouter = (): Router => {
    const router = Router();

    router.get('/', GetHealthRoute);

    return router;
};
