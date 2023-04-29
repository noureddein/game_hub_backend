import express from "express";
import cors from "cors";

import logger from "./logger";
import indexRouter from "../routers";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use("/", indexRouter);
const startServer = () =>
    app.listen(3030, () => logger.INFO("Server started successfully."));

export default startServer;
