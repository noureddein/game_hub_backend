import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

interface Error {
    type: string;
    msg: string;
    path: string;
    location: "body" | "params" | "query";
}

class Validation {
    validationFn(req: Request, res: Response, next: NextFunction) {
        function formatErrors(err: any) {
            let obj = {};
            err.forEach((e: any) => (obj = { ...obj, [e.path]: e.msg }));

            return obj;
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({
                message: "UNPROCESSABLE ENTITY",
                // errors: formatErrors(errors.errors),
                errors
            });
        }
        next();
    }
}

const validation = new Validation();

export default validation.validationFn;
