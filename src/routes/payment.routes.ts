import { Router } from "express";
import {
  confirmPaymentController,
  createStripePaymentIntent,
} from "../controller/payment.controller";
const router = Router();
router.post("/create/intent", createStripePaymentIntent);
router.post("/confirm", confirmPaymentController);
export const paymentRoutes = router;
