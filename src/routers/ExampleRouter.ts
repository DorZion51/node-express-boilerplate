import { Router } from 'express';
import { exampleController } from '../controllers/ExampleController';

export const getExampleRouter = (): Router => {
    const router = Router();

    router.get('/doSomething', exampleController.doSomething);
    router.get('/games', exampleController.getGames);

    return router;
};
