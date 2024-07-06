"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerCreditupValidationSchema = void 0;
const zod_1 = require("zod");
exports.customerCreditupValidationSchema = zod_1.z.object({
    lender: zod_1.z.string({ message: "lender is required as string" }),
    outstandingBalance: zod_1.z.number({
        message: "oustandingBalance is required as number",
    }),
    contribute: zod_1.z.number({ message: "contribute is required as number" }),
    anotherLander: zod_1.z.number({ message: "anotherLander is required as number" }),
});
