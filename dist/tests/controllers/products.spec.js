"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_1 = require("../../controllers/product");
const app = (0, express_1.default)();
const { TOKEN_SECRET: secret } = process.env;
const request = (0, supertest_1.default)(app);
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
(0, product_1.productRoutes)(app);
describe('Product Routes', () => {
    const testId = '1';
    const mockToken = jsonwebtoken_1.default.sign(testId, secret);
    it('Gets a 200 response from the index endpoint [GET]', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    it('Gets a 200 response from the show endpoint [GET]', async () => {
        const response = await request.get(`/products/${testId}`);
        expect(response.status).toBe(200);
    });
    it('Gets a 200 response from the create endpoint when a token is set [POST]', async () => {
        const mockProduct = {
            name: 'Squatty Potty',
            price: 19.99,
        };
        const response = await request
            .post('/products')
            .set('Authorization', 'bearer ' + mockToken)
            .send(mockProduct);
        expect(response.status).toBe(200);
    });
    describe('Protects Product Routes', () => {
        it('Requires a token to access the create endpoint [POST]', async () => {
            const mockProduct = {
                name: 'Squatty Potty',
                price: 19.99,
            };
            const response = await request.post('/products').send(mockProduct);
            expect(response.status).toBe(401);
        });
    });
});
