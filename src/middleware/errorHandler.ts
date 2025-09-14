import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/validationError";
import { NewspostsServiceError } from "../errors/newspostsServiceError";
import { logger } from "../logger/logger";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidationError) {
    logger.warn(`ValidationError: ${err.message}`);
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof NewspostsServiceError) {
    logger.error(`NewspostsServiceError: ${err.message}\n${err.stack}`);
    return res.status(500).json({ error: "Service error" });
  }

  logger.error(`Unexpected error: ${err.message}\n${err.stack}`);
  return res.status(500).json({ error: "Internal server error" });
}
