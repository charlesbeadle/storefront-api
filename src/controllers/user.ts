import express, { Request, Response } from 'express';
import { UserType } from '../types/user';
import { User } from '../models/user';

const userInstance = new User();

const index = async (_req: Request, res: Response) => {
	try {
		const users = await userInstance.index();
		res.json(users);
	} catch (err) {
		res.json(err);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const userObj: UserType = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			password: req.body.password,
		};
		const newUser = await userInstance.create(userObj);
		res.json(newUser);
	} catch (err) {
		res.json(err);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const user = await userInstance.show(req.body.id);
		res.json(user);
	} catch (err) {
		res.json(err);
	}
};

export const userRoutes = (app: express.Application) => {
	app.get('/users', index);
	app.get('/users/:id', show);
	app.post('/users', create);
};
