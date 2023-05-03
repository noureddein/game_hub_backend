import { Router } from "express";
import passport from "passport";

import authController from "../controllers/auth-controller";
import validation from "../validation";

const authRouter = Router();

authRouter.post(
    "/v1/login",
    // validation.auth,
    passport.authenticate("local"),
    authController.login
);
export default authRouter;
