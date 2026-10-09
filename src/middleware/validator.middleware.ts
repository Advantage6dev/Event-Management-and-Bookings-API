import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function handleValidationError(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({
      success: false,
      message: 'Validation error',
      err: errors.array(),
    });
  }

  next();
}
