"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newspostsRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const newsposts_controller_1 = require("../controller/newsposts.controller");
const newspostsRouter = (0, express_1.Router)();
exports.newspostsRouter = newspostsRouter;
newspostsRouter.get("", newsposts_controller_1.getNewsposts);
newspostsRouter.get("/:key", newsposts_controller_1.getNewspost);
newspostsRouter.post("", passport_1.default.authenticate("jwt", { session: false }), newsposts_controller_1.addNewspost);
newspostsRouter.put("/:key", passport_1.default.authenticate("jwt", { session: false }), newsposts_controller_1.putNewspost);
newspostsRouter.delete("/:key", passport_1.default.authenticate("jwt", { session: false }), newsposts_controller_1.deleteNewspost);
newspostsRouter.get("/error/test", (req, res, next) => {
    try {
        (0, newsposts_controller_1.throwError)();
    }
    catch (err) {
        next(err);
    }
});
