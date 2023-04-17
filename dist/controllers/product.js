"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const verifyAuthToken_1 = require("../middleware/verifyAuthToken");
const product_1 = require("../models/product");
const productInstance = new product_1.Product();
const index = async (_req, res) => {
    try {
        const products = await productInstance.index();
        res.json(products);
    }
    catch (err) {
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await productInstance.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const productObj = {
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = await productInstance.create(productObj);
        res.json(newProduct);
    }
    catch (err) {
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken_1.verifyAuthToken, create);
};
exports.productRoutes = productRoutes;
