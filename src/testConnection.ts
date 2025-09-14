import "reflect-metadata";
import { AppDataSource } from "./typeORM/data-source";

AppDataSource.initialize()
  .then(() => console.log("Data Source initialized"))
  .catch((err) => console.error("Error during Data Source initialization", err));
