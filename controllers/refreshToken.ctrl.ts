import { Response, NextFunction } from "express";

import { type ReqWithIsValidTokens } from "../middleware/verifyUserTokens.mw";
import tokensHandler from "../utils/token";

class RefreshTokenController {
    refresh(req: ReqWithIsValidTokens, res: Response, next: NextFunction) {
            const newAccessToken = tokensHandler.createAccessToken(
                { id: req.user?.id } || {}
            );
            console.log("New token created", new Date())
            res.cookie("accessToken", newAccessToken);
            return res.status(201).json({ message: "New token created" });
        
    }
}

const refreshTokenController = new RefreshTokenController();

export default refreshTokenController;
