import { NextFunction, Request, Response } from "express";
import session, { SessionData } from "express-session";

import tokenController from "../utils/token";

declare module "express-session" {
    interface SessionData {
        user: {
            id?: number;
            accessToken: string;
            refreshToken: string;
        };
    }
}

export interface ReqUser extends Request {
    user?: User;
    session: session.Session & Partial<SessionData>;
}

export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

class AuthenticationController {
    login = async (
        req: ReqUser | Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (req.user) {
                const user: Partial<User> = req.user;
                const accessToken = tokenController.createAccessToken({
                    id: user.id,
                });
                // const refreshToken = tokenController.createRefreshToken({
                //     id: user.id,
                // });

                // res.cookie("refreshToken", refreshToken, {
                //     httpOnly: true,
                //     secure: false,
                // });
                return res.status(200).json({
                    message: "Logged in successful.",
                    // accessToken,
                    user,
                });
            }
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong!!!" });
        }
    };
}

const authController = new AuthenticationController();
export default authController;
