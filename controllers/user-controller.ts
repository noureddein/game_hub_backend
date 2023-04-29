import { NextFunction, Request, Response } from "express";
import AbstractController from "./abstract-controller";
import db from "../models";
import { hashPassword } from "../utils/passwordUtils";

class UserController extends AbstractController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.checkErrors(req, res);

            try {
                const { firstName, lastName , password} = req.body;
                await db.User.create({
                    ...req.body,
                    first_name: firstName,
                    last_name: lastName,
                    password: await hashPassword(password)
                });
                return res
                    .status(201)
                    .json({ message: "User created successfully." });
            } catch (error: any) {
                return res.status(409).json({message: 'User already exist!.', fields: error.fields})
            }
        } catch (error) {
            next(error);
        }
    };

    listUsers(req: Request, res: Response, next: NextFunction) {}
    update(req: Request, res: Response, next: NextFunction) {}
}

const userController = new UserController();
export default userController;
