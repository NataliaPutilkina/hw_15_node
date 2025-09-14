import { Router } from "express";
import passport from "passport";


import { addNewspost, deleteNewspost, getNewspost, getNewsposts, putNewspost, throwError } from "../controller/newsposts.controller";

const newspostsRouter = Router();

newspostsRouter.get("", getNewsposts);
newspostsRouter.get("/:key", getNewspost);
newspostsRouter.post("", passport.authenticate("jwt", { session: false }), addNewspost);
newspostsRouter.put("/:key", passport.authenticate("jwt", { session: false }), putNewspost);
newspostsRouter.delete("/:key", passport.authenticate("jwt", { session: false }), deleteNewspost);




newspostsRouter.get("/error/test", (req, res, next) => {
  try {
    throwError();
  } catch (err) {
    next(err);
  }
});

export { newspostsRouter };
