import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

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

app.get('/', function (_req: Request, res: Response) {
	res.send('Hello World!');
});

// Start the server
app.listen(port, () => console.log(`app running on ${port}`));
