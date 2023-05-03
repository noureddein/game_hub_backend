import passport from "passport";
import PassportLocal, { type IStrategyOptions } from "passport-local";
import bcrypt from "bcrypt";

import db from "../models";
import logger from "../services/logger";
import AbstractController from "../controllers/abstract-controller";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

const opt: IStrategyOptions = {
    usernameField: "email",
};

class UserAuthentication extends AbstractController {
    private async passportMiddleware(
        email: string,
        password: string,
        done: any
    ) {
        console.log("==== email ====", { email, password });
        try {
            const user = await db.User.findOne({
                where: {
                    email,
                },
                raw: true,
            });

            const isPasswordsMatch = bcrypt.compareSync(
                password,
                user.password
            );

            if (isPasswordsMatch) return done(null, user);

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
}

const userAuthentication = new UserAuthentication();
logger.INFO("Passport strategy runs!");
export default userAuthentication.passportStrategy();
