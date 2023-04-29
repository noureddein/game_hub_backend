import { body } from "express-validator";

const isPasswordMatch = (password: string, confirmedPassword: string) => {
    if (password !== confirmedPassword)
        return Promise.reject("Password mismatch.");
    return true;
};

const register = [
    body("username")
        .exists()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be a string.")
        .notEmpty()
        .withMessage("Username should not be empty!.")
        .isLength({ min: 4, max: 32 })
        .withMessage("Min characters 4, max characters 32")
        .trim(),
    body("firstName")
        .exists()
        .withMessage("First name is required")
        .isString()
        .withMessage("First name must be a string.")
        .notEmpty()
        .withMessage("First name should not be empty!.")
        .isLength({ min: 4, max: 32 })
        .withMessage("Min characters 4, max characters 32")
        .trim(),
    body("lastName")
        .exists()
        .withMessage("Last name is required")
        .isString()
        .withMessage("Last name must be a string.")
        .notEmpty()
        .withMessage("Last name should not be empty!.")
        .isLength({ min: 4, max: 32 })
        .withMessage("Min characters 4, max characters 32")
        .trim(),
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
        .withMessage(`Password can't be empty`)
        .isLength({ min: 8, max: 32 })
        .withMessage("Password must be: min 8 characters, max 32 characters."),
    body("confirmPassword").custom((value, { req }) =>
        isPasswordMatch(value, req.body.password)
    ),
];

const user = {
    register,
};

export default user;
