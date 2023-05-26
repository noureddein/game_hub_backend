import { Router } from "express";

import userRouter from './user.rt'
import authRouter from './auth.rt'
import refreshTokenRouter  from './refreshToken.rt'

const indexRouter = Router();

indexRouter.use([userRouter, authRouter, refreshTokenRouter])

export default indexRouter