import http from "http";
import "reflect-metadata";

import { app } from "./app";
import { AppDataSource } from "./typeORM/data-source";
import { initialize } from "passport";


const PORT = process.env.PORT || 8000;

AppDataSource.initialize()
.then(() => {
  console.log("Server initialize");

  const server = http.createServer(app);

  server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  });
})
.catch((err) => {
  console.error("Error server initialization", err);
})







