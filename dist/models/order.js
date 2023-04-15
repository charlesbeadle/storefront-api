"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const database_1 = __importDefault(require("../database"));
const OrderExists_1 = require("../errors/OrderExists");
class Order {
    show(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const openOrderSql = "SELECT * FROM orders WHERE user_id = $1 AND status = 'open'";
                const order = (yield conn.query(openOrderSql, [uid])).rows[0];
                const orderProductsSql = `
        SELECT p.name, p.price, op.product_quantity AS quantity
        FROM products p
        JOIN order_products op ON p.id = op.product_id
        WHERE op.order_id = $1
      `;
                const products = (yield conn.query(orderProductsSql, [order.id])).rows;
                conn.release();
                return {
                    status: order.status,
                    products: products,
                };
            }
            catch (err) {
                throw new Error(`Failed to get order. Error: ${err}`);
            }
        });
    }
    create(orderPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid, products } = orderPayload;
            try {
                const conn = yield database_1.default.connect();
                const orderExistsSql = "SELECT * FROM orders WHERE user_id = $1 AND status = 'open'";
                const openOrderExists = yield conn.query(orderExistsSql, [uid]);
                if (openOrderExists.rowCount > 0) {
                    throw new OrderExists_1.OrderExists('An open order exists for this user');
                }
                const sql = "INSERT INTO orders (user_id, status) VALUES ($1, 'open') RETURNING *";
                const order = (yield conn.query(sql, [uid])).rows[0];
                const orderProductsSql = 'INSERT INTO order_products (order_id, product_id, product_quantity) VALUES ($1, $2, $3) RETURNING *';
                const orderProducts = [];
                for (let product of products) {
                    const { id: product_id, quantity } = product;
                    const orderProduct = (yield conn.query(orderProductsSql, [order.id, product_id, quantity])).rows[0];
                    orderProducts.push(orderProduct);
                }
                conn.release();
                return {
                    order: Object.assign({}, order),
                    products: orderProducts,
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.Order = Order;
