import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables from .env
dotenv.config();

// Destructure environment variables
const { PG_HOST, PG_DB, PG_USER, PG_PASS } = process.env;

// Create a Pool instance
const client = new Pool({
	host: PG_HOST,
	database: PG_DB,
	user: PG_USER,
	password: PG_PASS,
});

export default client;
