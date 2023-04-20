"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const verifyAuthToken_1 = require("../middleware/verifyAuthToken");
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const secret = TOKEN_SECRET;
const userInstance = new user_1.User();
const index = async (_req, res) => {
    try {
        const users = await userInstance.index();
        res.json(users);
    }
    catch (err) {
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const userObj = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const newUser = await userInstance.create(userObj);
        res.json({ token: jsonwebtoken_1.default.sign({ newUser }, secret) });
    }
    catch (err) {
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await userInstance.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get('/users', verifyAuthToken_1.verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken_1.verifyAuthToken, show);
    app.post('/users', create);
};
exports.userRoutes = userRoutes;
