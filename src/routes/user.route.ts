import { Router } from "express";
import { passport } from "../middleware/passport";
import { getUserHandler } from "../middleware/userHandler";

export const userRouter = Router();

userRouter.get("/", passport.authenticate("jwt", { session: false }), getUserHandler);
