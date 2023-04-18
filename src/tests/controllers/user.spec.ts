import express from 'express';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import client from '../../database';
import { userRoutes } from '../../controllers/user';
import { UserType } from '../../types/user';

const app: express.Application = express();
const { TOKEN_SECRET: secret } = process.env;
const request = supertest(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
userRoutes(app);

describe('User Routes', () => {
	afterAll(async () => {
		const conn = await client.connect();
		const sql = "DELETE FROM users WHERE firstname = 'Harold'";
		await conn.query(sql);
	});

	describe('User Creation', () => {
		it('Gets a valid jwt and a 200 response from the create endpoint [POST]', async () => {
			const mockUser: UserType = {
				firstname: 'Harold',
				lastname: 'Finch',
				password: 'root',
			};
			const response = await request.post('/users').send(mockUser);
			jwt.verify(response.body.token, secret as string);
			expect(response.status).toBe(200);
		});
	});

	describe('User Data', () => {
		const genMock = async () => {
			const conn = await client.connect();
			const sql = "SELECT * FROM users WHERE firstname = 'Harold'";
			const result = await conn.query(sql);
			const id = result.rows[0].id;
			const token = jwt.sign(id, secret as string);
			return {
				mockToken: token,
				userId: id,
			};
		};

		it('Gets a 200 response from the index endpoint when a token is set [GET]', async () => {
			const { mockToken } = await genMock();
			const response = await request
				.get('/users')
				.set('Authorization', 'bearer ' + mockToken);
			expect(response.status).toBe(200);
		});

		it('Gets a 200 response from the show endpoint when a token is set [GET]', async () => {
			const { mockToken, userId } = await genMock();
			const response = await request
				.get(`/users/${userId}`)
				.set('Authorization', 'bearer ' + mockToken);
			expect(response.status).toBe(200);
		});

		it('Requires a token to access /users [GET]', async () => {
			const response = await request.get('/users');
			expect(response.status).toBe(401);
		});

		it('Requires a token to access /users/:id [GET]', async () => {
			const { userId } = await genMock();
			const response = await request.get(`/users/${userId}`);
			expect(response.status).toBe(401);
		});
	});
});
