import { Router } from "express";
import {
  deleteRowFromSheetController,
  readSheetController,
} from "../controller/googleApi.controller";
const router = Router();
router.get("/read", readSheetController);

router.delete("/delete/:rowIndex", deleteRowFromSheetController);

export const googleApiRoutes = router;
