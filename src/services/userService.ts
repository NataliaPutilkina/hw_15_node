import { AppDataSource } from "../typeORM/data-source";
import { User } from "../entities/user";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "supersecret";

export class UserService {
  static async registerUser(email: string, password: string, confirmPassword: string) {
    if (!email || !password || !confirmPassword) {
      throw new Error("All fields required");
    }
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match_test");
    }

    const userRepo = AppDataSource.getRepository(User);
    const existing = await userRepo.findOne({ where: { email } });
    if (existing) throw new Error("User already exists");

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    const newUser = userRepo.create({ email, password: hashedPassword });
    await userRepo.save(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET, { expiresIn: "1h" });
    return "Bearer " + token;
  }

  static async login(email: string, password: string) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    if (user.password !== hashedPassword) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
    return "Bearer " + token;
  }

  static async getUserById(id: number) {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) throw new Error("User not found");
    return { id: user.id, email: user.email };
  }
}
export { SECRET }; 
