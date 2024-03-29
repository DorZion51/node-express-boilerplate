// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // allow us to make HTTPS requests without caring about the other side

import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'http';
import responseTime from 'response-time';
import { Configuration, getConfiguration } from './configuration/Configuration';
import { logger } from './configuration/logging/Logger';
import { connectToDatabase } from './db/Provider';
import { getCorsMiddleware } from './middleware/CorsMiddleware';
import { getLogMiddleware } from './middleware/LogMiddleware';
import { getExampleRouter } from './routers/ExampleRouter';
import { getHealthRouter } from './routers/HealthRouter';

const applyMiddlewareAndRouters = (app: express.Application, configuration: Configuration) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: '50mb' }));
    app.use(responseTime());
    app.use(getLogMiddleware);
    app.use(getCorsMiddleware(configuration));
    app.use('/health', getHealthRouter());
    app.use('/example', getExampleRouter());
};

export interface Application {
    app: express.Application;
    server: Server;
}

export const initiateApp = async (env?: NodeJS.ProcessEnv): Promise<void> => {
    dotenv.config(); // enable reading environment variables from .env file
    const app: express.Application = express();
    const configuration: Configuration = getConfiguration(env);
    console.log('here');

    connectToDatabase()
        .then(() => {
            applyMiddlewareAndRouters(app, configuration);

            logger(configuration).log({
                level: 'info',
                message: 'Application starts running with this configuration',
                ...configuration,
            });

            app.listen(parseInt(configuration.serverPort), '0.0.0.0', () => {
                logger(configuration).log({
                    level: 'info',
                    message: `Server is running on port ${configuration.serverPort}`,
                });
            });
        })
        .catch((error: Error) => {
            logger(configuration).log({
                level: 'error',
                message: `Database connection failed ${error}`,
            });
            process.exit();
        });
};
