"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewspost = exports.newspostSchema = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default({ allErrors: true });
exports.newspostSchema = {
    type: "object",
    properties: {
        title: { type: "string", maxLength: 50 },
        text: { type: "string", maxLength: 256 },
        genre: { type: "string", enum: ["Politic", "Business", "Sport", "Other"] },
        isPrivate: { type: "boolean" },
    },
    required: ["title", "text", "genre", "isPrivate"],
    additionalProperties: false,
};
exports.validateNewspost = ajv.compile(exports.newspostSchema);
