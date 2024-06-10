import express from "express";
import { authRoutes } from "./auth.route";
import { googleApiRoutes } from "./googleApi.route";
import customer from "./customer.route";
import customerAddress from "./customerAddress.route";
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
    path: "/customer-address",
    route: customerAddress,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
