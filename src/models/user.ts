import Client from '../database';
import { UserType } from '../types/user';

export class User {
	async index(): Promise<UserType[]> {
		try {
			const conn = await Client.connect();

			const sql: string = 'SELECT * FROM users';

			const result = await conn.query(sql);

			conn.release();

			return result.rows;
		} catch (err) {
			throw new Error(`Failed to get users. Error: ${err}`);
		}
	}

	async show(id: string): Promise<UserType> {
		try {
			const conn = await Client.connect();

			const sql: string = 'SELECT * FROM users WHERE id = $1';

			const result = await conn.query(sql, [id]);

			conn.release();

			return result.rows[0];
		} catch (err) {
			throw new Error(`Failed to get user. Error: ${err}`);
		}
	}

	async create(u: UserType): Promise<UserType> {
		try {
			const conn = await Client.connect();

			const sql: string =
				'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';

			const result = await conn.query(sql, [
				u.firstname,
				u.lastname,
				u.password,
			]);

			const user = result.rows[0];

			conn.release();

			return user;
		} catch (err) {
			throw new Error(`Failed to create user. Error: ${err}`);
		}
	}
}
