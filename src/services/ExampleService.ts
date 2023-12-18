import { DoSomethingQueryParams } from '../models/ExampleTypes';

class ExampleService {
    doSomething = async (params: DoSomethingQueryParams): Promise<number> => {
        try {
            const { someParam } = params;
            // here requst to db
            return new Promise(() => someParam * 2);
        } catch (error) {
            throw error;
        }
    };
}

export const exampleService = new ExampleService();
