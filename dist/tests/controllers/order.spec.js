"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const body_parser_1 = __importDefault(require("body-parser"));
const order_1 = require("../../controllers/order");
const app = (0, express_1.default)();
const { TOKEN_SECRET: secret } = process.env;
const request = (0, supertest_1.default)(app);
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
(0, order_1.orderRoutes)(app);
describe('Order Routes', () => {
    const testUserId = '1';
    const mockToken = jsonwebtoken_1.default.sign(testUserId, secret);
    it('Gets a 200 response from the show endpoint [GET]', async () => {
        const response = await request
            .get(`/orders/${testUserId}`)
            .set('Authorization', 'bearer ' + mockToken);
        expect(response.status).toBe(200);
    });
    it('Requires a token to access the show endpoint [GET]', async () => {
        const response = await request.get(`/orders/${testUserId}`);
        expect(response.status).toBe(401);
    });
});
