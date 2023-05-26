import { Router } from "express";
import passport from "passport";

import authController from "../controllers/auth.ctrl";
import validationMiddleware from "../middleware/validation.mw";
import validation from "../validation";

const authRouter = Router();

authRouter.post(
    "/v1/login",
    validation.auth,
    validationMiddleware.checkErrors,
    passport.authenticate("local"),
    passport.authenticate("jwt"),
    authController.login
);
export default authRouter;
