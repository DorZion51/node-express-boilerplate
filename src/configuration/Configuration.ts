import { ServiceConfiguration } from './Configuration.json';

export enum CustomRequestHeaders {
    requestId = 'requestId',
    requestingActorId = 'requestingActorId',
    someHeader = 'someHeader',
}

export interface Configuration {
    serverPort: string;
    currentEnv: string;
}

export const getConfiguration = (env: NodeJS.ProcessEnv = process.env): Configuration => {
    const currentEnv = env.CURRENT_ENV || 'local';
    const localConfig: Partial<Configuration> =
        currentEnv === 'local'
            ? {
                  serverPort: '5000',
              }
            : { serverPort: '8080' };

    if (currentEnv === 'dev') {
        return {
            currentEnv,
            ...ServiceConfiguration.common,
            ...ServiceConfiguration.dev,
            ...localConfig,
        };
    } else if (currentEnv === 'test') {
        return {
            currentEnv,
            ...ServiceConfiguration.common,
            ...ServiceConfiguration.test,
            ...localConfig,
        };
    } else if (currentEnv === 'prod') {
        return {
            currentEnv,
            ...ServiceConfiguration.common,
            ...ServiceConfiguration.prod,
            ...localConfig,
        };
    } else {
        return {
            currentEnv,
            ...ServiceConfiguration.common,
            ...ServiceConfiguration.local,
            ...localConfig,
        };
    }
};
