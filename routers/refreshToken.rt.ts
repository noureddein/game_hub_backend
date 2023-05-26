import { Router } from "express";
import verifyUserTokens from "../middleware/verifyUserTokens.mw";
import refreshTokenController from "../controllers/refreshToken.ctrl";

const refreshTokenRouter = Router();

refreshTokenRouter.get(
    "/v1/refreshToken",
    verifyUserTokens.verifyRefreshToken,
    refreshTokenController.refresh
);

export default refreshTokenRouter;
