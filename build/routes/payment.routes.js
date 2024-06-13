"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("../controller/payment.controller");
const router = (0, express_1.Router)();
router.post("/create/intent", payment_controller_1.createStripePaymentIntent);
router.post("/confirm", payment_controller_1.confirmPaymentController);
exports.paymentRoutes = router;
