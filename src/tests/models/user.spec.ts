import { User } from '../../models/user';
import { UserType } from '../../types/user';
import client from '../../database';

const userInstance = new User();

const userPayload: UserType = {
	firstname: 'Ethan',
	lastname: 'Hunt',
	password: 'IMF',
};

const genMock = async () => {
	const conn = await client.connect();
	const sql = "SELECT * FROM users WHERE firstname = 'Ethan'";
	const result = await conn.query(sql);
	const user = result.rows[0];
	return user;
};

describe('User Model', () => {
	afterAll(async () => {
		const conn = await client.connect();
		const sql = "DELETE FROM users WHERE firstname = 'Ethan'";
		await conn.query(sql);
	});
	describe('Create User', () => {
		it('Creates a new user', async () => {
			const user = await userInstance.create(userPayload);
			expect(user.firstname).toBe('Ethan');
			expect(user.lastname).toBe('Hunt');
		});
	});

	describe('Show User', () => {
		it('Gets user data by ID', async () => {
			const { id } = await genMock();
			const user = await userInstance.show(id);
			expect(user.firstname).toBe('Ethan');
			expect(user.lastname).toBe('Hunt');
		});
	});

	describe('Show Users', () => {
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
