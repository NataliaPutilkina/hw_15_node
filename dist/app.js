"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const newsposts_route_1 = require("./routes/newsposts.route");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_route_1 = require("./routes/auth.route");
const user_route_1 = require("./routes/user.route");
const passport_1 = require("./middleware/passport");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(passport_1.passport.initialize());
// app.use((req, resp, next) => {
//   next();  
// });
app.use("/api/newsposts", newsposts_route_1.newspostsRouter);
app.use("/auth", auth_route_1.authRouter);
app.use("/user", user_route_1.userRouter);
app.use(errorHandler_1.errorHandler);
