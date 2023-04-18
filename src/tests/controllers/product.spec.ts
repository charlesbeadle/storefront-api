import express from 'express';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { productRoutes } from '../../controllers/product';
import { ProductType } from '../../types/product';

const app: express.Application = express();
const { TOKEN_SECRET: secret } = process.env;
const request = supertest(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
productRoutes(app);

describe('Product Routes', () => {
	const testId = '1';

	const mockToken = jwt.sign(testId, secret as string);

	it('Gets a 200 response from the index endpoint [GET]', async () => {
		const response = await request.get('/products');
		expect(response.status).toBe(200);
	});

	it('Gets a 200 response from the show endpoint [GET]', async () => {
		const response = await request.get(`/products/${testId}`);
		expect(response.status).toBe(200);
	});

	it('Gets a 200 response from the create endpoint when a token is set [POST]', async () => {
		const mockProduct: ProductType = {
			name: 'Squatty Potty',
			price: 19.99,
		};
		const response = await request
			.post('/products')
			.set('Authorization', 'bearer ' + mockToken)
			.send(mockProduct);
		expect(response.status).toBe(200);
	});

	describe('Protects Product Routes', () => {
		it('Requires a token to access the create endpoint [POST]', async () => {
			const mockProduct: ProductType = {
				name: 'Squatty Potty',
				price: 19.99,
			};
			const response = await request.post('/products').send(mockProduct);
			expect(response.status).toBe(401);
		});
	});
});
