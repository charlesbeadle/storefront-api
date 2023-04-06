import Client from '../database';

export class User {
	constructor() {}

	async index() {
		try {
			const conn = await Client.connect();
			console.log('connected');
			conn.release();
		} catch (err) {
			console.log('connection failed');
		}
	}
}
