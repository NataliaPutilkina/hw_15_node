"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInHandler = exports.signUpHandler = void 0;
const userService_1 = require("../services/userService");
const signUpHandler = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const token = await userService_1.UserService.registerUser(email, password, confirmPassword);
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.signUpHandler = signUpHandler;
const signInHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userService_1.UserService.login(email, password);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.signInHandler = signInHandler;
