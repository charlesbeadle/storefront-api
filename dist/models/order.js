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
class Order {
    /* async show(uid: string): Promise<OrderProducts> {
        try {
            const conn = await Client.connect();
            const sqlUserOrder: string =
                "select * from orders where user_id=($1) and status='open'";
            let userOrderResultSet = await conn.query(sqlUserOrder, [uid]);
            let userOrderResult: { id: number; user_id: number; status: string } =
                userOrderResultSet.rows[0];
            const userOrderId = userOrderResult.id;
            let userOrderStatus: string = userOrderResult.status;
            const sqlUserOrderProducts =
                'SELECT p.name AS name, p.price AS price, op.product_quantity AS quantity FROM products AS p JOIN order_products op ON p.id = op.product_id WHERE op.order_id=($1);';
            let userOrderProductsResultSet = await conn.query(sqlUserOrderProducts, [
                userOrderId,
            ]);
            let userOrderProductsResult: {
                name: string;
                price: number;
                quantity: number;
            }[] = userOrderProductsResultSet.rows;
            conn.release();
            return {
                status: userOrderStatus,
                products: userOrderProductsResult,
            };
        } catch (err) {
            throw new Error(`Failed to get order. Error: ${err}`);
        }
    } */
    show(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const openOrderSql = "SELECT * FROM orders WHERE user_id=$1 AND status='open'";
                const { id: orderId, status } = (yield conn.query(openOrderSql, [uid]))
                    .rows[0];
                const orderProductsSql = `
        SELECT p.name, p.price, op.product_quantity AS quantity
        FROM products p
        JOIN order_products op ON p.id = op.product_id
        WHERE op.order_id=$1;
      `;
                const products = (yield conn.query(orderProductsSql, [orderId])).rows;
                conn.release();
                return { status, products };
            }
            catch (err) {
                throw new Error(`Failed to get order. Error: ${err}`);
            }
        });
    }
    // TEMP NOTE TO SELF: This should do two things. There should be an insertion into orders and into order_products
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'insert into orders (user_id, status) values ($1, $2) returning *';
                const result = yield conn.query(sql, [o.uid, o.status]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Failed to create order. Error: ${err}`);
            }
        });
    }
}
exports.Order = Order;
