"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewspostsServiceError = void 0;
class NewspostsServiceError extends Error {
    constructor(message) {
        super(message);
        this.name = "NewspostsServiceError";
    }
}
exports.NewspostsServiceError = NewspostsServiceError;
