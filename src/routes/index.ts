import express from "express";
import { authRoutes } from "./auth.route";
import customer from "./customer.route";
import { googleApiRoutes } from "./googleApi.route";
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
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
