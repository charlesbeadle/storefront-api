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
exports.productRoutes = void 0;
const product_1 = require("../models/product");
const productInstance = new product_1.Product();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productInstance.index();
        res.json(products);
    }
    catch (err) {
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productInstance.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productObj = {
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = yield productInstance.create(productObj);
        res.json(newProduct);
    }
    catch (err) {
        res.json(err);
    }
});
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
};
exports.productRoutes = productRoutes;
