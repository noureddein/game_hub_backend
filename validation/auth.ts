import { body } from "express-validator";

const login = [
    body("email")
        .exists()
        .withMessage("Email is required")
        .notEmpty()
        .withMessage("Email should not be empty!.")
        .isEmail()
        .withMessage("Not a valid email.")
        .trim(),
    body("password")
        .exists()
        .withMessage("Password is required.")
        .notEmpty()
        .withMessage(`Password can't be empty`),
];

export default login;
