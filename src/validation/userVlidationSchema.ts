import { z } from "zod";

export const userValidationSchema = z.object({
  emailOrNumber: z.string({ message: "emailOrNumber is required string" }),
  password: z
    .string({ message: "password is required string" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    }),
  userType: z.enum(["agent", "customer"]).optional().default("customer"),
});

export const userPasswordValidatoinResetSchema = z.object({
  emailOrNumber: z.string({ message: "emailOrNumber is required string" }),
  newPassword: z
    .string({ message: "newPassword is required string" })
    .min(8, { message: "newPassword must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "newPassword must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "newPassword must contain at least one lowercase letter",
    }),
  oldPassword: z
    .string({ message: "oldPassword is required string" })
    .min(8, { message: "oldPassword must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "oldPassword must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "oldPassword must contain at least one lowercase letter",
    }),
});
