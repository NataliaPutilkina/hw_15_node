import { Request, Response } from "express";
import { UserService } from "../services/userService";

export const signUpHandler = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const token = await UserService.registerUser(email, password, confirmPassword);
    res.status(201).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const signInHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.login(email, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
