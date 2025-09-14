"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./typeORM/data-source");
data_source_1.AppDataSource.initialize()
    .then(() => console.log("Data Source initialized"))
    .catch((err) => console.error("Error during Data Source initialization", err));
