import express from 'express';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { orderRoutes } from '../../controllers/order';

const app: express.Application = express();
const { TOKEN_SECRET: secret } = process.env;
const request = supertest(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
orderRoutes(app);

describe('Order Routes', () => {
	const testUserId = '1';

	const mockToken = jwt.sign(testUserId, secret as string);

	it('Gets a 200 response from the show endpoint [GET]', async () => {
		const response = await request
			.get(`/orders/${testUserId}`)
			.set('Authorization', 'bearer ' + mockToken);
		expect(response.status).toBe(200);
	});

	it('Requires a token to access the show endpoint [GET]', async () => {
		const response = await request.get(`/orders/${testUserId}`);
		expect(response.status).toBe(401);
	});
});
