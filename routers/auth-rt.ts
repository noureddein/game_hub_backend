import { Router } from "express";

import authController from "../controllers/auth-controller";
import validation from "../validation";

const authRouter = Router();

authRouter.post(
    "/v1/login",
    validation.auth,
    authController.login
    );

export default authRouter;
