import { Request, Response, NextFunction } from 'express';

export function handleError(
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log(error);

  const message =
    error instanceof Error ? error.message : 'Internal Server Error';

  response.status(500).json({
    success: false,
    message,
  });

  next();
}
