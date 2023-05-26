import { NextFunction, Request, Response } from "express";
import cookieParser from "cookie";
import jwt from "jsonwebtoken";
import { User } from "../controllers/auth.ctrl";
import tokensHandler, { TokensHandler } from "../utils/token";

export interface ReqWithIsValidTokens extends Request {
    isValidRefreshToken?: boolean;
    isValidAccessToken?: boolean;
    user?: Partial<User>;
}

class VerifyUserTokens extends TokensHandler {
    constructor() {
        super();
        this.verifyRefreshToken = this.verifyRefreshToken.bind(this);
        this.verifyAccessToken = this.verifyAccessToken.bind(this);
    }

    verifyRefreshToken(
        req: ReqWithIsValidTokens,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userTokens = cookieParser.parse(req.headers.cookie || "");
            const isValidRefreshToken: any = jwt.verify(
                userTokens.refreshToken,
                this.REFRESH_TOKEN_SECRET,
                (err) => {
                    if (err) return false;
                    return true;
                }
            );
            console.log({
                isValidRefreshToken: isValidRefreshToken,
            });

            if (!isValidRefreshToken) {
                return res
                    .status(401)
                    .json({ message: "Unauthorized, need to log in." });
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    verifyAccessToken(
        req: ReqWithIsValidTokens,
        res: Response,
        next: NextFunction
    ): any {
        try {
            const userTokens = cookieParser.parse(req.headers.cookie || "");
            const isValidAccessToken: any = jwt.verify(
                userTokens.accessToken,
                this.ACCESS_TOKEN_SECRET,
                (err: any) => {
                    if (err) return false;
                    return true;
                }
            );
            req.isValidAccessToken = isValidAccessToken;

            next();
        } catch (error) {
            next(error);
        }
    }
}

const verifyUserTokens = new VerifyUserTokens();

export default verifyUserTokens;
