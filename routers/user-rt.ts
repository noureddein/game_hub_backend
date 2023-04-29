import { Router } from "express";

import userController from "../controllers/user-controller";
import validation from "../validation/index";
const router = Router();

router.post(
    "/v1/user/create",
    validation.user.register,
    userController.create
);

export default router;
