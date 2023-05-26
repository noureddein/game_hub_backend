import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import logger from "../services/logger";

interface Error {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}

class ValidationMiddleware {
    constructor() {
        this.formatErrors = this.formatErrors.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
    }

    private formatErrors(err: any) {
        let obj: { [x: string]: Error }[] = [];

        const errKeys = [
            ...new Set<string>(err.errors.map((e: Error) => e.path)),
        ];

        for (let index = 0; index < errKeys.length; index++) {
            let key: string = errKeys[index];

            const errorsPerKey = err.errors.filter(
                ({ path }: Error) => path === key
            );
            obj = [
                ...obj,
                {
                    [key]: errorsPerKey.map((err: Error) => err.msg),
                },
            ];
        }

        return obj;
    }
    checkErrors(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: this.formatErrors(errors),
                message: "Invalid inputs.",
            });
        }

        next();
    }
}

const validationMiddleware = new ValidationMiddleware();

export default validationMiddleware;
