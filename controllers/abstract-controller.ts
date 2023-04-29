import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

interface Error {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
}

class AbstractController {
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
            obj = [...obj, { [key]: errorsPerKey }];
        }

        return obj;
    }

    checkErrors(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: this.formatErrors(errors),
                message: "Invalid inputs.",
            });
        }
    }
}

export default AbstractController;
