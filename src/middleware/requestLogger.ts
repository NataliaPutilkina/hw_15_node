import { Request, Response, NextFunction } from "express";
import { logger } from "../logger/logger";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const { method, url, body, headers } = req;

  logger.info("Incoming request", {
    method,
    url,
    body: body && typeof body === "object" ? body : {},
    headers,
    timestamp: new Date().toISOString(),
  });

  next();
}
