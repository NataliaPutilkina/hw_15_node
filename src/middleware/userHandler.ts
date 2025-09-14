import { Request, Response } from "express";
import { UserService } from "../services/userService";

export const getUserHandler = (req: Request, res: Response) => {
  try {
    const user: any = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userData = UserService.getUserById(user.id);
    res.json(userData);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
