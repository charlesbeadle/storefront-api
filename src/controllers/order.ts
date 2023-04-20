import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/verifyAuthToken';
import { Order } from '../models/order';
import { OrderExists } from '../errors/OrderExists';

const orderInstance = new Order();

const show = async (req: Request, res: Response) => {
	try {
		const order = await orderInstance.show(req.params.uid);
		res.json(order);
	} catch (err) {
		res.json(err);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const order = await orderInstance.create({
			uid: req.body.uid,
			products: req.body.products,
		});
		res.json(order);
	} catch (err) {
		if (err instanceof OrderExists) {
			res.status(409);
			res.json({
				message: err.message,
			});
		} else {
			res.json(err);
		}
	}
};

export const orderRoutes = (app: express.Application) => {
	app.get('/orders/:uid', verifyAuthToken, show);
	app.post('/orders', create);
};
