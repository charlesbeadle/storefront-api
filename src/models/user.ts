import { UserType } from '../types/user';
import Client from '../database';

export class User {
	async index(): Promise<UserType[]> {
		try {
			const conn = await Client.connect();
			const sql: string = 'select * from users';
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
			const sql: string = 'select * from users where id=($1)';
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
				'insert into users (firstname, lastname, password) values ($1, $2, $3) returning *';
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
