"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
require("reflect-metadata");
const app_1 = require("./app");
const data_source_1 = require("./typeORM/data-source");
const PORT = process.env.PORT || 8000;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Server initialize");
    const server = http_1.default.createServer(app_1.app);
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
})
    .catch((err) => {
    console.error("Error server initialization", err);
});
