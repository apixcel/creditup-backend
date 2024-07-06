import { Router } from "express";
import {
  confirmPaymentController,
  createStripePaymentIntent,
  createSubscriptionSession,
} from "../controller/payment.controller";
const router = Router();
router.post("/create/subscription", createSubscriptionSession);
router.post("/create/intent", createStripePaymentIntent);
router.post("/confirm", confirmPaymentController);
export const paymentRoutes = router;
