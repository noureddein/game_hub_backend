import router from './user-rt'

import { Router } from "express";


const indexRouter = Router();

indexRouter.use([router])

export default indexRouter