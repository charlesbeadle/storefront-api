"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const database_1 = __importDefault(require("../database"));
const OrderExists_1 = require("../errors/OrderExists");
class Order {
    async show(uid) {
        try {
            const conn = await database_1.default.connect();
            const openOrderSql = "SELECT * FROM orders WHERE user_id = $1 AND status = 'active'";
            const order = (await conn.query(openOrderSql, [uid])).rows[0];
            const orderProductsSql = `
      SELECT
        p.id,
        op.product_quantity AS quantity
      FROM
        products p
        JOIN order_products op ON p.id = op.product_id
      WHERE
        op.order_id = $1;
      `;
            const products = (await conn.query(orderProductsSql, [order.id])).rows;
            conn.release();
            return {
                id: order.id,
                status: order.status,
                user_id: order.user_id,
                products: products,
            };
        }
        catch (err) {
            throw new Error(`Failed to get order. Error: ${err}`);
        }
    }
    async create(orderPayload) {
        const { uid, products } = orderPayload;
        try {
            const conn = await database_1.default.connect();
            const orderExistsSql = "SELECT * FROM orders WHERE user_id = $1 AND status = 'active'";
            const openOrderExists = await conn.query(orderExistsSql, [uid]);
            if (openOrderExists.rowCount > 0) {
                throw new OrderExists_1.OrderExists('An open order exists for this user');
            }
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
            const order = (await conn.query(sql, [uid, 'active'])).rows[0];
            const orderProductsSql = 'INSERT INTO order_products (order_id, product_id, product_quantity) VALUES ($1, $2, $3) RETURNING *';
            const orderProducts = [];
            for (let product of products) {
                const { id: product_id, quantity } = product;
                const orderProduct = (await conn.query(orderProductsSql, [order.id, product_id, quantity])).rows[0];
                orderProducts.push(orderProduct);
            }
            conn.release();
            return {
                order: { ...order },
                products: orderProducts,
            };
        }
        catch (err) {
            throw err;
        }
    }
}
exports.Order = Order;
