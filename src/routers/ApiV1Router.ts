import { Router } from 'express';
import { apiV1Controller } from '../controllers/ApiV1Controller';

export const getApiV1Router = (): Router => {
    const router = Router();

    router.get('/entity', apiV1Controller.getReq);
    router.post('/entity', apiV1Controller.postReq);

    return router;
};
