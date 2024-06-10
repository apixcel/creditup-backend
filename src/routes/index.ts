import express from "express";
import { authRoutes } from "./auth.route";
import { googleApiRoutes } from "./googleApi.route";
import customerApiRoutes from "./customer.route";
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
    route: customerApiRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
