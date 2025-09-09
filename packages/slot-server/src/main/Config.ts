import {parse} from "dotenv";
import {existsSync, readFileSync} from 'fs';
import {join} from 'path';
import {Logger} from "@nestjs/common";

if (!existsSync('.env')) {
    Logger.error(`Could not find .env file at: ${__dirname}`);
    process.exit(1);
}

const env = parse(readFileSync('.env'));
export const Config = {
    httpPort: parseInt(env?.HTTP_PORT) || 3000,
    freeCredits: parseInt(env?.FREE_CREDITS) || 10,
    rollCost: parseInt(env?.ROLL_COST) || 1,

    db: {
        type: 'postgres',
        host: env?.DB_HOST,
        port: parseInt(env?.DB_PORT),
        username: env?.DB_USERNAME,
        password: env?.DB_PASSWORD,
        database: env?.DB_DATABASE,
        schema: env?.DB_SCHEMA,
        autoLoadEntities: true,
        entities: [
            join(__dirname, 'domain/entity/*.{ts,js}')
        ],
        migrationsRun: false,
        migrations: [
            join(__dirname, '../migrations/*.{ts,js}')
        ],
        cli: {
            migrationsDir: './src/migrations',
        }
    },
    
    rewardManagers: {
        baseWinRate: 50,
        cheatingThreshold: [
            {credits: 40, rerollChance: 30},
            {credits: 60, rerollChance: 60},
        ],
    }
}