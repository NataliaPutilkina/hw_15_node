import cors from "cors";
import express from "express";


import { newspostsRouter } from "./routes/newsposts.route";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { authRouter } from "./routes/auth.route";
import { userRouter } from "./routes/user.route";
import { passport } from "./middleware/passport";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// app.use((req, resp, next) => {
//   next();  
// });

app.use("/api/newsposts", newspostsRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(errorHandler)

export { app };
