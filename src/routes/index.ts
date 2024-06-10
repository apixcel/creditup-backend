import express from "express";
import { authRoutes } from "./auth.route";
const router = express.Router();

const moduleRoute = [
  {
    path: "/auth",
    route: authRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
