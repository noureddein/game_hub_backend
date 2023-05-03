import passport from "passport";
import PassportLocal, { type IStrategyOptions } from "passport-local";
import bcrypt from "bcrypt";

import db from "../models";
import logger from "../services/logger";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

const opt: IStrategyOptions = {
    usernameField: "email",
};
class UserAuthentication {
    userPassport() {}
}

passport.use(
    new PassportLocal.Strategy(opt, async (email, password, done) => {
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
            if (isPasswordsMatch) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            console.log(error)
            return done(error);
        }
    })
);

// const userAuthentication = new UserAuthentication().userPassport();
logger.INFO("Passport strategy runs!");
// export default userAuthentication;
