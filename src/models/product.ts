import Client from '../database';
import { ProductType } from '../types/product';

export class Product {
	async index(): Promise<ProductType[]> {
		try {
			const conn = await Client.connect();
			const sql = 'select * from products';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Failed to get products: Error: ${err}`);
		}
	}

	async show(id: string): Promise<ProductType> {
		try {
			const conn = await Client.connect();
			const sql: string = 'select * from products where id=($1)';
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Failed to get product. Error: ${err}`);
		}
	}

	async create(u: ProductType): Promise<ProductType> {
		try {
			const conn = await Client.connect();
			const sql: string =
				'insert into products (name, price) values ($1, $2) returning *';
			const result = await conn.query(sql, [u.name, u.price]);
			const product = result.rows[0];
			conn.release();
			return product;
		} catch (err) {
			throw new Error(`Failed to create product. Error: ${err}`);
		}
	}
}
