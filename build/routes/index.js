"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./auth.route");
const customer_route_1 = __importDefault(require("./customer.route"));
const googleApi_route_1 = require("./googleApi.route");
const payment_routes_1 = require("./payment.routes");
const router = express_1.default.Router();
const moduleRoute = [
    {
        path: "/auth",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/sheet",
        route: googleApi_route_1.googleApiRoutes,
    },
    {
        path: "/customer",
        route: customer_route_1.default,
    },
    {
        path: "/payment",
        route: payment_routes_1.paymentRoutes,
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
