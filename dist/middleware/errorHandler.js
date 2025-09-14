"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const validationError_1 = require("../errors/validationError");
const newspostsServiceError_1 = require("../errors/newspostsServiceError");
const logger_1 = require("../logger/logger");
function errorHandler(err, req, res, next) {
    if (err instanceof validationError_1.ValidationError) {
        logger_1.logger.warn(`ValidationError: ${err.message}`);
        return res.status(400).json({ error: err.message });
    }
    if (err instanceof newspostsServiceError_1.NewspostsServiceError) {
        logger_1.logger.error(`NewspostsServiceError: ${err.message}\n${err.stack}`);
        return res.status(500).json({ error: "Service error" });
    }
    logger_1.logger.error(`Unexpected error: ${err.message}\n${err.stack}`);
    return res.status(500).json({ error: "Internal server error" });
}
