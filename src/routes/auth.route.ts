import { Router } from "express";
import { signUpHandler, signInHandler } from "../middleware/authHandlers";

export const authRouter = Router();

authRouter.post("/register", signUpHandler);
authRouter.post("/login", signInHandler);
