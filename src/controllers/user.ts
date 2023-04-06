import express, { Request, Response } from 'express';
import { User } from '../models/user';

const user = new User();

const index = async (_req: Request, _res: Response) => {
	await user.index();
	return;
};

export const userRoutes = (app: express.Application) => {
	app.get('/users', index);
};
