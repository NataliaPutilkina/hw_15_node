"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
const logger_1 = require("../logger/logger");
function requestLogger(req, res, next) {
    const { method, url, body, headers } = req;
    logger_1.logger.info("Incoming request", {
        method,
        url,
        body: body && typeof body === "object" ? body : {},
        headers,
        timestamp: new Date().toISOString(),
    });
    next();
}
