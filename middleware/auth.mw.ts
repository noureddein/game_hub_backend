import { NextFunction, Request, Response } from "express";
import passport from "passport";
import PassportLocal, {
    type IStrategyOptions,
    type VerifyFunction,
} from "passport-local";
import PassportJWT, { type StrategyOptions } from "passport-jwt";
import bcrypt from "bcrypt";

import db from "../models";
import logger from "../services/logger";
import { type User } from "../controllers/auth.ctrl";
import { ReqWithIsValidTokens } from "./verifyUserTokens.mw";
import { JwtPayload } from "jsonwebtoken";

passport.serializeUser((user: Partial<User>, done) => {
    if (user.password) delete user.password;
    return done(null, user);
});
passport.deserializeUser((user: User, done) => done(null, user));

const opt: IStrategyOptions = {
    usernameField: "email",
};

class PassportLocalStrategy {
    private async passportMiddleware(
        email: string,
        password: string,
        done: Function
    ): Promise<VerifyFunction> {
        console.log("==== email ====", { email, password });
        try {
            const user: User = await db.User.findOne({
                where: {
                    email,
                },
                raw: true,
            });

            if (!user) {
                return done(false, null, { message: "Incorrect credentials." });
            }

            if (user && bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            }

            return done(null, false);
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }

    private strategyInstance() {
        return new PassportLocal.Strategy(opt, this.passportMiddleware);
    }

    passportStrategy() {
        passport.use(this.strategyInstance());
    }

    isUserAuthenticated(
        req: ReqWithIsValidTokens,
        res: Response,
        next: NextFunction
    ) {
        console.log({
            isAuth: req.isAuthenticated(),
        });
        if (!req.isAuthenticated())
            return res
                .status(403)
                .json({ message: "You need to login first." });
        next();
    }
}

export interface Payload {}

class PassportJWTStrategy {
    declare opt: StrategyOptions;

    constructor() {
        this.opt = {
            jwtFromRequest:
                PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "Need to be changed",
        };
    }
    private passportMiddleware(payload: JwtPayload, done: Function) {
        try {
            return done(null, payload);
        } catch (error) {
            done
        }
    }

    private strategyInstance() {
        return new PassportJWT.Strategy(this.opt, this.passportMiddleware);
    }

    passportStrategy() {
        passport.use(this.strategyInstance());
    }
}

export const passportLocalStrategy = new PassportLocalStrategy();
export const passportJwt = new PassportJWTStrategy()

passportLocalStrategy.passportStrategy();
passportJwt.passportStrategy()

logger.INFO("Passport strategy runs!");
