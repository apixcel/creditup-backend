"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sheetAppentDataValidationSchema = void 0;
const zod_1 = require("zod");
exports.sheetAppentDataValidationSchema = zod_1.z.object({
    data: zod_1.z.tuple([zod_1.z.string(), zod_1.z.number(), zod_1.z.number()]),
});
