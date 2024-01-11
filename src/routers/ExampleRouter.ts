import { Router } from 'express';
import { exampleController } from '../controllers/ExampleController';

export const getExampleRouter = (): Router => {
    const router = Router();

    router.get('/doSomething', exampleController.doSomething);
    router.get('/games', exampleController.getGames);
    router.post('/register', exampleController.register);
    router.post('/login', exampleController.login);

    return router;
};
