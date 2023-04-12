import Client from '../database';
import { OrderType, OrderProducts } from '../types/order';

export class Order {
	async show(uid: string): Promise<OrderProducts> {
		try {
			const conn = await Client.connect();
			const openOrderSql =
				"SELECT * FROM orders WHERE user_id=$1 AND status='open'";
			const { id: orderId, status } = (await conn.query(openOrderSql, [uid]))
				.rows[0];

			const orderProductsSql = `
        SELECT p.name, p.price, op.product_quantity AS quantity
        FROM products p
        JOIN order_products op ON p.id = op.product_id
        WHERE op.order_id=$1;
      `;
			const products = (await conn.query(orderProductsSql, [orderId])).rows;

			conn.release();
			return { status, products };
		} catch (err) {
			throw new Error(`Failed to get order. Error: ${err}`);
		}
	}

	// TEMP NOTE TO SELF: This should do two things. There should be an insertion into orders and into order_products
	async create(o: OrderType): Promise<OrderType> {
		try {
			const conn = await Client.connect();
			const sql: string =
				'insert into orders (user_id, status) values ($1, $2) returning *';
			const result = await conn.query(sql, [o.uid, o.status]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (err) {
			throw new Error(`Failed to create order. Error: ${err}`);
		}
	}
}
