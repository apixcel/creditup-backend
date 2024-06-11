import { Router } from "express";
import {
  checkIsExist,
  loginController,
  passwordResetController,
} from "../controller/auth.controller";
import { validSchema } from "../middlewares/validShema";
import {
  userPasswordValidatoinResetSchema,
  userValidationSchema,
} from "../validation/userVlidationSchema";
const router = Router();
router.post("/isexist", checkIsExist);
router.post("/login", validSchema(userValidationSchema), loginController);
router.post(
  "/reset-password",
  validSchema(userPasswordValidatoinResetSchema),
  passwordResetController
);
export const authRoutes = router;
