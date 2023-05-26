import { NextFunction, Request, Response } from "express";
import db from "../models";
import { hashPassword } from "../utils/passwordUtils";
import { type User } from "./auth.ctrl";

class UserController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { firstName, lastName, password } = req.body;

            const newUser = await db.User.create({
                ...req.body,
                first_name: firstName,
                last_name: lastName,
                password: await hashPassword(password),
            });

            console.log(newUser);

            return res
                .status(201)
                .json({ message: "User created successfully." });
        } catch (error: any) {
            console.log(error);
            return res.status(409).json({
                message: "User already exist!.",
            });
        }
    };

    async userProfile(req: Request, res: Response, next: NextFunction) {
        // https://www.learmoreseekmore.com/2022/10/reactjs-v18-jwtauthentication-using-httponly-cookie.html
        try {
            const { id } = req.params;

            const user: User = await db.User.findByPk(id, { raw: true });

            if (!user)
                return res.status(404).json({ message: "User not found" });

            return res.status(200).json({ ...user, password: null });
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                message: "Unauthorized user.",
            });
        }
    }

    listUsers(req: Request, res: Response, next: NextFunction) {}
    update(req: Request, res: Response, next: NextFunction) {}
}

const userController = new UserController();
export default userController;
