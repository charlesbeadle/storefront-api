import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { userRoutes } from './controllers/user';

// Load environment variables from .env
dotenv.config();

// Create an express app instance
const app: express.Application = express();

// Configure CORS settings
const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
};

// Assign a port value
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors(corsOptions));

// Use Body Parser middleware
app.use(bodyParser.json());

// Register user routes
userRoutes(app);

// Start the server
app.listen(port, () => console.log(`app running on ${port}`));
