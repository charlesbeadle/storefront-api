"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASS, SALT_ROUNDS } = process.env;
const hashPassword = (pass) => {
    const hash = bcrypt_1.default.hashSync(pass + BCRYPT_PASS, parseInt(SALT_ROUNDS));
    return hash;
};
exports.hashPassword = hashPassword;
