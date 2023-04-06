"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
// Load environment variables from .env
dotenv_1.default.config();
// Destructure environment variables
const { PG_HOST, PG_DB, PG_USER, PG_PASS } = process.env;
// Create a Pool instance
const client = new pg_1.Pool({
    host: PG_HOST,
    database: PG_DB,
    user: PG_USER,
    password: PG_PASS,
});
exports.default = client;
