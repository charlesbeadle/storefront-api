"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const product_1 = require("../../models/product");
const user_1 = require("../../models/user");
const database_1 = __importDefault(require("../../database"));
const orderInstance = new order_1.Order();
describe('Order Model', () => {
    beforeAll(async () => {
        const userInstance = new user_1.User();
        const productInstance = new product_1.Product();
        const conn = await database_1.default.connect();
        const { id: user_id } = await userInstance.create({
            firstname: 'Mia',
            lastname: 'Wallace',
            password: 'two-shakes',
        });
        const { id: product_id } = await productInstance.create({
            name: 'Squatty Potty',
            price: 19.99,
        });
        const orderSql = "INSERT INTO orders (user_id, status) values ($1, 'active') RETURNING *";
        const orderResult = await conn.query(orderSql, [user_id]);
        const { id: order_id } = orderResult.rows[0];
        const opSql = 'INSERT INTO order_products (order_id, product_id, product_quantity) values ($1, $2, 1)';
        await conn.query(opSql, [order_id, product_id]);
    });
    afterAll(async () => {
        const conn = await database_1.default.connect();
        const selectUserSql = "SELECT id FROM users WHERE firstname = 'Mia'";
        const selectOrderSql = 'SELECT id FROM orders WHERE user_id = $1';
        const deleteOpsSql = 'DELETE FROM order_products WHERE order_id = $1';
        const deleteOrdersSql = 'DELETE FROM orders WHERE user_id = $1';
        const deleteProductsSql = "DELETE FROM products WHERE name = 'Squatty Potty'";
        const deleteUsersSql = "DELETE FROM users WHERE firstname = 'Mia'";
        const userResult = await conn.query(selectUserSql);
        const { id: user_id } = userResult.rows[0];
        const orderResult = await conn.query(selectOrderSql, [user_id]);
        const { id: order_id } = orderResult.rows[0];
        await conn.query(deleteOpsSql, [order_id]);
        await conn.query(deleteOrdersSql, [user_id]);
        await conn.query(deleteProductsSql);
        await conn.query(deleteUsersSql);
    });
    it('Gets an order by user ID', async () => {
        const conn = await database_1.default.connect();
        const userSql = "SELECT id FROM users WHERE firstname = 'Mia'";
        const productSql = "SELECT id FROM products WHERE name = 'Squatty Potty'";
        const userResult = await conn.query(userSql);
        const { id: user_id } = userResult.rows[0];
        const productResult = await conn.query(productSql);
        const { id: product_id } = productResult.rows[0];
        const order = await orderInstance.show(String(user_id));
        expect(order.user_id).toBe(user_id);
        expect(order.products[0].id).toBe(product_id);
    });
});
