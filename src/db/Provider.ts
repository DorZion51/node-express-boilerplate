import * as mongoDB from 'mongodb';
import { getConfiguration } from '../configuration/Configuration';
import { logger } from '../configuration/logging/Logger';
import Game from './models/Games';
export const collections: { games?: mongoDB.Collection<Game> } = {};

export const connectToDatabase = async () => {
    const configuration = getConfiguration();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(configuration.dbConnection);

    await client.connect();

    const db: mongoDB.Db = client.db(configuration.dbName);

    const gamesCollection: mongoDB.Collection<Game> = db.collection(configuration.gamesCollection);

    collections.games = gamesCollection;

    logger(configuration).log({
        level: 'info',
        message: `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`,
    });
};
