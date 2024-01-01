import { GetQueryParams, PostBodyParams } from '../models/ApiV1Types';

class ApiV1Service {
    doSomething = (params: GetQueryParams): number => {
        try {
            const { someParam } = params;
            // here requst to db
            return someParam * 2;
        } catch (error) {
            throw error;
        }
    };

    doSomething2 = (params: PostBodyParams): number => {
        try {
            const { someParam } = params;
            // here requst to db
            return someParam * 2;
        } catch (error) {
            throw error;
        }
    };
}

export const apiV1Service = new ApiV1Service();
