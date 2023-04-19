import { User } from '../../models/user';
import client from '../../database';

describe('User Model', () => {
	const userInstance = new User();

	afterAll(async () => {
		const conn = await client.connect();
		const sql = "DELETE FROM users WHERE firstname = 'Ethan'";
		await conn.query(sql);
		conn.release();
	});

	describe('User Model', () => {
		it('Creates a new user', async () => {
			const user = await userInstance.create({
				firstname: 'Ethan',
				lastname: 'Hunt',
				password: 'IMF',
			});
			expect(user.firstname).toBe('Ethan');
			expect(user.lastname).toBe('Hunt');
		});

		it('Gets user data by ID', async () => {
			const conn = await client.connect();
			const sql = "SELECT * FROM users WHERE firstname = 'Ethan'";
			const result = await conn.query(sql);
			conn.release();
			const { id: user_id } = result.rows[0];
			const user = await userInstance.show(user_id);
			expect(user.firstname).toBe('Ethan');
			expect(user.lastname).toBe('Hunt');
		});

		it('Gets an array of users', async () => {
			const users = await userInstance.index();
			const user = users[0];
			expect(users.length >= 1).toBe(true);
			expect(user.hasOwnProperty('firstname')).toBe(true);
			expect(user.hasOwnProperty('lastname')).toBe(true);
			expect(user.hasOwnProperty('password')).toBe(true);
		});
	});
});
