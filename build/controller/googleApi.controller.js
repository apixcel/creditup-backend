"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRowFromSheetController = exports.readSheetController = void 0;
const app_1 = require("../app");
const catchAsyncError_1 = require("../utils/catchAsyncError");
const connectGoogleSheet_1 = require("../utils/connectGoogleSheet");
exports.readSheetController = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const googleSheet = yield (0, connectGoogleSheet_1.connectGoogleSheet)();
    const spreadsheetId = "1NkczMUsM3Su-AmpQpRWb6QpConYxHxhVndvbnhmTwf8";
    const getSheetData = yield googleSheet.spreadsheets.values.get({
        auth: app_1.auth,
        spreadsheetId,
        range: "Sheet1",
    });
    res.status(200).json({ data: getSheetData });
}));
exports.deleteRowFromSheetController = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const googleSheet = yield (0, connectGoogleSheet_1.connectGoogleSheet)();
    const spreadsheetId = "1NkczMUsM3Su-AmpQpRWb6QpConYxHxhVndvbnhmTwf8";
    // Assuming the row index to delete is provided in the request parameters
    const rowIndex = parseInt(req.params.rowIndex, 10) || 3; // Default to row 3 if not provided
    const request = {
        requests: [
            {
                deleteDimension: {
                    range: {
                        sheetId: 0,
                        dimension: "ROWS",
                        startIndex: rowIndex - 1,
                        endIndex: rowIndex,
                    },
                },
            },
        ],
    };
    // Execute the request to delete the row
    const response = yield googleSheet.spreadsheets.batchUpdate({
        auth: app_1.auth,
        spreadsheetId,
        requestBody: request,
    });
    res.send(response);
}));
