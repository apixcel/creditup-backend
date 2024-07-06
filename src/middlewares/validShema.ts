import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validSchema = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.safeParseAsync(req.body);
      next();
    } catch (error) {
      return next(error);
    }
  };
};
export const validBodySchema = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (err) {
      next(err);
    }
  };
};
