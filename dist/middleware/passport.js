"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.passport = void 0;
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const passport_jwt_1 = require("passport-jwt");
const data_source_1 = require("../typeORM/data-source");
const user_1 = require("../entities/user");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET || "supersecret";
exports.SECRET = SECRET;
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
}, async (payload, done) => {
    try {
        const userRepo = data_source_1.AppDataSource.getRepository(user_1.User);
        const user = await userRepo.findOne({ where: { id: payload.id } });
        if (user)
            return done(null, user);
        return done(null, false);
    }
    catch (err) {
        return done(err, false);
    }
}));
