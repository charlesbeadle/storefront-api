import express, { Request, Response } from 'express';
import { OrderType } from '../types/order';
import { Order } from '../models/order';

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
		const orderObj: OrderType = {
			uid: req.body.uid,
			status: req.body.status,
		};
		const newOrder = await orderInstance.create(orderObj);
		res.json(newOrder);
	} catch (err) {
		res.json(err);
	}
};

export const orderRoutes = (app: express.Application) => {
	app.get('/orders/:uid', show);
	app.post('/orders', create);
};
