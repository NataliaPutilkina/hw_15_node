"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const passport_1 = require("../middleware/passport");
const userHandler_1 = require("../middleware/userHandler");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/", passport_1.passport.authenticate("jwt", { session: false }), userHandler_1.getUserHandler);
