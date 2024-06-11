import { Router } from "express";
import {
  loginController,
  passwordResetController,
} from "../controller/auth.controller";
import { validSchema } from "../middlewares/validShema";
import {
  userPasswordValidatoinResetSchema,
  userValidationSchema,
} from "../validation/userVlidationSchema";
const router = Router();
// router.post("/register", validSchema(userValidationSchema), registerController);
router.post("/login", validSchema(userValidationSchema), loginController);
router.post(
  "/reset-password",
  validSchema(userPasswordValidatoinResetSchema),
  passwordResetController
);
export const authRoutes = router;
