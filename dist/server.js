"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("./controllers/user");
const order_1 = require("./controllers/order");
const product_1 = require("./controllers/product");
// Load environment variables from .env
dotenv_1.default.config();
// Create an express app instance
const app = (0, express_1.default)();
// Configure CORS settings
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
// Assign a port value
const port = process.env.PORT || 3000;
// Use CORS middleware
app.use((0, cors_1.default)(corsOptions));
// Use Body Parser middleware
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Register user routes
(0, user_1.userRoutes)(app);
// Register product routes
(0, product_1.productRoutes)(app);
// Register order routes
(0, order_1.orderRoutes)(app);
// Start the server
app.listen(port);
exports.default = app;
