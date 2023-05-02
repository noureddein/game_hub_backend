import userRouter from './user-rt'
import authRouter from './auth-rt'
import { Router } from "express";


const indexRouter = Router();

indexRouter.use([userRouter, authRouter])

export default indexRouter