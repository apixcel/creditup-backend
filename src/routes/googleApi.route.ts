import { Router } from "express";
import {
  appendDataInSheetController,
  deleteRowFromSheetController,
  readSheetController,
} from "../controller/googleApi.controller";
import { validSchema } from "../middlewares/validShema";
import { sheetAppentDataValidationSchema } from "../validation/appendSheetDataValidation";
const router = Router();
router.get("/read", readSheetController);
router.post(
  "/write",
  validSchema(sheetAppentDataValidationSchema),
  appendDataInSheetController
);
router.delete(
  "/delete/:rowIndex",
  deleteRowFromSheetController
);
export const googleApiRoutes = router;
