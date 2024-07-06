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
exports.appendDataInSheetController = void 0;
const app_1 = require("../app");
const connectGoogleSheet_1 = require("../utils/connectGoogleSheet");
const sheetHeadings_1 = require("../utils/sheetHeadings");
const appendDataInSheetController = (sheetData) => __awaiter(void 0, void 0, void 0, function* () {
    const googleSheet = yield (0, connectGoogleSheet_1.connectGoogleSheet)();
    const spreadsheetId = "1djwwYUSrumNb0IIpmLJNl2rWp1YlCFtdi9DKfhNQrtU";
    // Map sheetData to match sheet headings
    const data = sheetHeadings_1.sheetHeading.map((head) => {
        const value = sheetData[head];
        if (value === undefined || value === null) {
            return "UNKNOWN"; // Handle undefined or null values
        }
        return value.toString(); // Ensure value is a string
    });
    try {
        const res = yield googleSheet.spreadsheets.values.append({
            auth: app_1.auth,
            spreadsheetId,
            range: `Sheet1!A2:B`, // Adjust the range as per your sheet structure
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [data],
            },
        });
        console.log("Data appended successfully:", res.data);
        return res;
    }
    catch (err) {
        console.error("Error appending data:", err);
        throw err;
    }
});
exports.appendDataInSheetController = appendDataInSheetController;
