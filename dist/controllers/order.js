"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const verifyAuthToken_1 = require("../middleware/verifyAuthToken");
const order_1 = require("../models/order");
const OrderExists_1 = require("../errors/OrderExists");
const orderInstance = new order_1.Order();
const show = async (req, res) => {
    try {
        const order = await orderInstance.show(req.params.uid);
        res.json(order);
    }
    catch (err) {
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const orderPayload = {
            uid: req.body.uid,
            products: req.body.products,
        };
        const order = await orderInstance.create(orderPayload);
        res.json(order);
    }
    catch (err) {
        if (err instanceof OrderExists_1.OrderExists) {
            res.status(409);
            res.json({
                message: err.message,
            });
        }
        else {
            res.json(err);
        }
    }
};
const orderRoutes = (app) => {
    app.get('/orders/:uid', verifyAuthToken_1.verifyAuthToken, show);
    app.post('/orders', create);
};
exports.orderRoutes = orderRoutes;
