"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHandler = void 0;
const userService_1 = require("../services/userService");
const getUserHandler = (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const userData = userService_1.UserService.getUserById(user.id);
        res.json(userData);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getUserHandler = getUserHandler;
