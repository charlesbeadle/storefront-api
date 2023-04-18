"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const database_1 = __importDefault(require("../../database"));
const userInstance = new user_1.User();
const userPayload = {
    firstname: 'Ethan',
    lastname: 'Hunt',
    password: 'IMF',
};
const genMock = async () => {
    const conn = await database_1.default.connect();
    const sql = "SELECT * FROM users WHERE firstname = 'Ethan'";
    const result = await conn.query(sql);
    const user = result.rows[0];
    return user;
};
describe('User Model', () => {
    afterAll(async () => {
        const conn = await database_1.default.connect();
        const sql = "DELETE FROM users WHERE firstname = 'Ethan'";
        await conn.query(sql);
    });
    describe('Create User', () => {
        it('Creates a new user', async () => {
            const user = await userInstance.create(userPayload);
            expect(user.firstname).toBe('Ethan');
            expect(user.lastname).toBe('Hunt');
        });
    });
    describe('Show User', () => {
        it('Gets user data by ID', async () => {
            const { id } = await genMock();
            const user = await userInstance.show(id);
            expect(user.firstname).toBe('Ethan');
            expect(user.lastname).toBe('Hunt');
        });
    });
    describe('Show Users', () => {
        it('Gets an array of users', async () => {
            const users = await userInstance.index();
            const user = users[0];
            expect(users.length >= 1).toBe(true);
            expect(user.hasOwnProperty('firstname')).toBe(true);
            expect(user.hasOwnProperty('lastname')).toBe(true);
            expect(user.hasOwnProperty('password')).toBe(true);
        });
    });
});
