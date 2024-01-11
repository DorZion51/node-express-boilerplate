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
    usersCollection: string;
    jwtAccessSecretKey: string;
    jwtRefreshSecretKey: string;
}

export const getConfiguration = (env: NodeJS.ProcessEnv = process.env): Configuration => ({
    currentEnv: env.CURRENT_ENV || 'local',
    serverPort: env.SERVER_PORT || '5000',
    dbConnection: env.DB_CONN_STRING || 'mongodb://localhost:27017',
    dbName: env.DB_NAME || 'demo',
    gamesCollection: env.GAMES_COLLECTION_NAME || 'games',
    usersCollection: env.USERS_COLLECTION_NAME || 'users',
    jwtAccessSecretKey: env.JWT_ACCESS_SECRET_KEY || 'AKONAMATATA',
    jwtRefreshSecretKey: env.JWT_REFRESH_SECRET_KEY || 'AKONAMATATA',
});
