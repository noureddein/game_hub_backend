import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import AbstractController from "./abstract-controller";
import db from "../models";
import logger from "../services/logger";

class AuthenticationController extends AbstractController {
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = this.checkErrors(req, res);
            if (errors) {
                return res.status(422).json({
                    errors,
                    message: "Invalid inputs.",
                });
            }

            if (req.user) {
                return res
                    .status(200)
                    .json({
                        message: "Logged in successful.",
                        user: { ...req.user, password: null },
                    });
            }
            return res.status(401).json({
                message: "User not found from controller",
                user: req.user,
            });
        } catch (error) {
            console.log("User controller from err", error);
            // next(error);
            return res.status(500).json({ message: "Something went wrong" });
        }
    };
}

const authController = new AuthenticationController();
export default authController;
