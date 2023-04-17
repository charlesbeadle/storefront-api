"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("../../controllers/user");
const app = (0, express_1.default)();
const { TOKEN_SECRET: secret } = process.env;
const request = (0, supertest_1.default)(app);
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
(0, user_1.userRoutes)(app);
describe('User Routes', () => {
    const testUserId = '1';
    const mockToken = jsonwebtoken_1.default.sign(testUserId, secret);
    it('Gets a 200 response from the index endpoint when a token is set', async () => {
        const response = await request
            .get('/users')
            .set('Authorization', 'bearer ' + mockToken);
        expect(response.status).toBe(200);
    });
    it('Gets a 200 response from the show endpoint when a token is set', async () => {
        const response = await request
            .get(`/users/${testUserId}`)
            .set('Authorization', 'bearer ' + mockToken);
        expect(response.status).toBe(200);
    });
    it('Gets a valid jwt and a 200 response from the create endpoint', async () => {
        const mockUser = {
            firstname: 'Harold',
            lastname: 'Finch',
            password: 'root',
        };
        const response = await request.post('/users').send(mockUser);
        jsonwebtoken_1.default.verify(response.body.token, secret);
        expect(response.status).toBe(200);
    });
    describe('Protects User Routes', () => {
        it('Requires a token to access /users [GET]', async () => {
            const response = await request.get('/users');
            expect(response.status).toBe(401);
        });
        it('Requires a token to access /users/:id [GET]', async () => {
            const response = await request.get(`/users/${testUserId}`);
            expect(response.status).toBe(401);
        });
    });
});
