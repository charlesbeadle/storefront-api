import express, { Request, Response } from 'express';
import { ProductType } from '../types/product';
import { Product } from '../models/product';

const productInstance = new Product();

const index = async (_req: Request, res: Response) => {
	try {
		const products = await productInstance.index();
		res.json(products);
	} catch (err) {
		res.json(err);
	}
};

const show = async (req: Request, res: Response) => {
	try {
		const product = await productInstance.show(req.params.id);
		res.json(product);
	} catch (err) {
		res.json(err);
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const productObj: ProductType = {
			name: req.body.name,
			price: req.body.price,
		};
		const newProduct = await productInstance.create(productObj);
		res.json(newProduct);
	} catch (err) {
		res.json(err);
	}
};

export const productRoutes = (app: express.Application) => {
	app.get('/products', index);
	app.get('/products/:id', show);
	app.post('/products', create);
};
