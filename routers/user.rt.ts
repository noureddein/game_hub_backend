import { Router } from "express";

import userController from "../controllers/user.ctrl";
import validation from "../validation/index";

// ** Middleware's Imports
import validationMiddleware from "../middleware/validation.mw";
import {passportLocalStrategy} from "../middleware/auth.mw";
import verifyUserTokens from "../middleware/verifyUserTokens.mw";
import passport from "passport";
const userRouter = Router();

userRouter.get(
    "/v1/user/profile/:id",
    validation.user.profile,
    validationMiddleware.checkErrors,
    passport.authenticate('jwt'),
    userController.userProfile
);

userRouter.post(
    "/v1/user/create",
    validation.user.register,
    validationMiddleware.checkErrors,
    userController.create
);

export default userRouter;
