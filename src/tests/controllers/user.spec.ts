import express from 'express';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { userRoutes } from '../../controllers/user';
import { UserType } from '../../types/user';

const app: express.Application = express();
const { TOKEN_SECRET: secret } = process.env;
const request = supertest(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
userRoutes(app);

describe('User Routes', () => {
	const testUserId = '1';

	const mockToken = jwt.sign(testUserId, secret as string);

	it('Gets a 200 response from the index endpoint when a token is set', async () => {
		const response = await request
			.get('/users')
			.set('Authorization', 'bearer ' + mockToken);
		expect(response.status).toBe(200);
	});

	it('Gets a 200 response from the show endpoint when a token is set', async () => {
		const response = await request
			.get(`/users/${testUserId}`)
			.set('Authorization', 'bearer ' + mockToken);
		expect(response.status).toBe(200);
	});

	it('Gets a valid jwt and a 200 response from the create endpoint', async () => {
		const mockUser: UserType = {
			firstname: 'Harold',
			lastname: 'Finch',
			password: 'root',
		};
		const response = await request.post('/users').send(mockUser);
		jwt.verify(response.body.token, secret as string);
		expect(response.status).toBe(200);
	});

	describe('Protects User Routes', () => {
		it('Requires a token to access /users [GET]', async () => {
			const response = await request.get('/users');
			expect(response.status).toBe(401);
		});

		it('Requires a token to access /users/:id [GET]', async () => {
			const response = await request.get(`/users/${testUserId}`);
			expect(response.status).toBe(401);
		});
	});
});
