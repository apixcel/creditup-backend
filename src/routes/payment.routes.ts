import { Router } from "express";
import { createStripePaymentIntent } from "../controller/payment.controller";
const router = Router();
router.post("/create/intent",createStripePaymentIntent);
export const paymentRoutes = router;
