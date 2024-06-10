import { z } from "zod";

export const customerCreditupValidationSchema = z.object({
  lender: z.string({ message: "lender is required as string" }),
  outstandingBalance: z.number({
    message: "oustandingBalance is required as number",
  }),
  contribute: z.number({ message: "contribute is required as number" }),
  anotherLander: z.number({ message: "anotherLander is required as number" }),
});
