import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

/** Validates request body against a Zod schema */
export function validateDto<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          field: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({
          error: "Validation failed",
          details: formattedErrors,
        });
        return;
      }

      res
        .status(500)
        .json({ error: "Internal server error during validation" });
    }
  };
}
