import {config} from 'dotenv';

config();

export const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_DATABASE,
    JWT_SECRET,
    SERVER_PORT
} = process.env;