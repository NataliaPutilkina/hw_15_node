"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.UserService = void 0;
const data_source_1 = require("../typeORM/data-source");
const user_1 = require("../entities/user");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET || "supersecret";
exports.SECRET = SECRET;
class UserService {
    static async registerUser(email, password, confirmPassword) {
        if (!email || !password || !confirmPassword) {
            throw new Error("All fields required");
        }
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }
        const userRepo = data_source_1.AppDataSource.getRepository(user_1.User);
        const existing = await userRepo.findOne({ where: { email } });
        if (existing)
            throw new Error("User already exists");
        const hashedPassword = crypto_1.default.createHash("sha256").update(password).digest("hex");
        const newUser = userRepo.create({ email, password: hashedPassword });
        await userRepo.save(newUser);
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, SECRET, { expiresIn: "1h" });
        return "Bearer " + token;
    }
    static async login(email, password) {
        const userRepo = data_source_1.AppDataSource.getRepository(user_1.User);
        const user = await userRepo.findOne({ where: { email } });
        if (!user)
            throw new Error("User not found");
        const hashedPassword = crypto_1.default.createHash("sha256").update(password).digest("hex");
        if (user.password !== hashedPassword)
            throw new Error("Invalid credentials");
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
        return "Bearer " + token;
    }
    static async getUserById(id) {
        const userRepo = data_source_1.AppDataSource.getRepository(user_1.User);
        const user = await userRepo.findOne({ where: { id } });
        if (!user)
            throw new Error("User not found");
        return { id: user.id, email: user.email };
    }
}
exports.UserService = UserService;
