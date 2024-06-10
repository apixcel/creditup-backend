import { z } from "zod";

export const sheetAppentDataValidationSchema = z.object({
  data: z.tuple([z.string(), z.number(), z.number()]),
});
