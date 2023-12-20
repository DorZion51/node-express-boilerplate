export enum CustomRequestHeaders {
    requestId = 'requestId',
    requestingActorId = 'requestingActorId',
    someHeader = 'someHeader',
}

export interface Configuration {
    serverPort: string;
    currentEnv: string;
    dbConnection: string;
    dbName: string;
    gamesCollection: string;
}

export const getConfiguration = (env: NodeJS.ProcessEnv = process.env): Configuration => ({
    currentEnv: env.CURRENT_ENV || 'local',
    serverPort: env.SERVER_PORT || '5000',
    dbConnection: env.DB_CONN_STRING || 'mongodb://localhost:27017',
    dbName: env.DB_NAME || 'demo',
    gamesCollection: env.GAMES_COLLECTION_NAME || 'games',
});
