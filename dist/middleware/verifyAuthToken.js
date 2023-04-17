"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    const { TOKEN_SECRET: secret } = process.env;
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            res.status(401);
            res.json({ message: 'Unauthorized' });
            return;
        }
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        res.status(401);
        res.json({ message: 'Unauthorized' });
    }
};
exports.verifyAuthToken = verifyAuthToken;
