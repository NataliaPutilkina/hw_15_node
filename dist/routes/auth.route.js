"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authHandlers_1 = require("../middleware/authHandlers");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/register", authHandlers_1.signUpHandler);
exports.authRouter.post("/login", authHandlers_1.signInHandler);
