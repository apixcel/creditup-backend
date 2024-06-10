"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPasswordValidatoinResetSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    emailOrNumber: zod_1.z.string({ message: "emailOrNumber is required string" }),
    password: zod_1.z
        .string({ message: "password is required string" })
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
    })
        .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
    }),
    userType: zod_1.z.enum(["guest", "customer"]).optional().default("guest"),
});
exports.userPasswordValidatoinResetSchema = zod_1.z.object({
    emailOrNumber: zod_1.z.string({ message: "emailOrNumber is required string" }),
    newPassword: zod_1.z
        .string({ message: "newPassword is required string" })
        .min(8, { message: "newPassword must be at least 8 characters" })
        .regex(/[A-Z]/, {
        message: "newPassword must contain at least one uppercase letter",
    })
        .regex(/[a-z]/, {
        message: "newPassword must contain at least one lowercase letter",
    }),
    oldPassword: zod_1.z
        .string({ message: "oldPassword is required string" })
        .min(8, { message: "oldPassword must be at least 8 characters" })
        .regex(/[A-Z]/, {
        message: "oldPassword must contain at least one uppercase letter",
    })
        .regex(/[a-z]/, {
        message: "oldPassword must contain at least one lowercase letter",
    }),
});
