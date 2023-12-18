import { config, createLogger, format, transports } from 'winston'; // For advanced logging
import { Configuration } from '../Configuration';

// Create a log file and configure Winston to log to it

// const logLevels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6,
// };

export const logger = (configuration: Configuration) =>
    createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format:
            configuration.currentEnv === 'local'
                ? format.combine(
                      format.cli(),
                      format.colorize(),
                      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                      format.printf(({ timestamp, level, message, ...args }) => {
                          const metadata = Object.keys(args).length > 0 ? JSON.stringify(args, null, 2) : '';
                          return `${timestamp} [${level}]: ${message.trim()} \n${metadata}`;
                      }),
                  )
                : format.combine(
                      format.cli(),
                      format.colorize(),
                      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                      format.json({}),
                  ),
        transports: [new transports.Console()],
        levels: config.syslog.levels, // Type assertion to numeric log levels
    });

// Define a custom log middleware using Winston
