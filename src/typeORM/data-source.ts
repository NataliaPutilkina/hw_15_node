import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Newspost } from "../entities/newspost";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  
  
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: false, 
  logging: false,
  entities: [User, Newspost],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
