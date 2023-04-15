"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderExists = void 0;
class OrderExists extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.OrderExists = OrderExists;
