import { NextFunction, Request, Response } from "express";
import AbstractController from "./abstract-controller";

class UserController extends AbstractController {
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.checkErrors(req, res);

            

            return res.send("Passed");
        } catch (error) {
            next(error);
        }
    };

    listUsers(req: Request, res: Response, next: NextFunction) {}
    update(req: Request, res: Response, next: NextFunction) {}
}

const userController = new UserController();
export default userController;
