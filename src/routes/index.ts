import express from "express";
import { authRoutes } from "./auth.route";
import customer from "./customer.route";
import { googleApiRoutes } from "./googleApi.route";
import { paymentRoutes } from "./payment.routes";
const router = express.Router();

const moduleRoute = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/sheet",
    route: googleApiRoutes,
  },
  {
    path: "/customer",
    route: customer,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
