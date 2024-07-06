"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleApiRoutes = void 0;
const express_1 = require("express");
const googleApi_controller_1 = require("../controller/googleApi.controller");
const router = (0, express_1.Router)();
router.get("/read", googleApi_controller_1.readSheetController);
router.delete("/delete/:rowIndex", googleApi_controller_1.deleteRowFromSheetController);
exports.googleApiRoutes = router;
