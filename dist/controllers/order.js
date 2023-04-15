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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const order_1 = require("../models/order");
const OrderExists_1 = require("../errors/OrderExists");
const orderInstance = new order_1.Order();
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderInstance.show(req.params.uid);
        res.json(order);
    }
    catch (err) {
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderPayload = {
            uid: req.body.uid,
            products: req.body.products,
        };
        const order = yield orderInstance.create(orderPayload);
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
});
const orderRoutes = (app) => {
    app.get('/orders/:uid', show);
    app.post('/orders', create);
};
exports.orderRoutes = orderRoutes;
