import express from "express";
import passport from "passport";
import cors from "cors";
import session, { SessionOptions } from "express-session";
import { v4 as uuidv4 } from "uuid";
import logger from "./logger";
import indexRouter from "../routers";

// TypeScript feature
//side effect import
import "../middleware/user-auth"; // This will run the strategy when the server run!

const app = express();

const sessionOpt: SessionOptions = {
    secret: "keyboard cat",
    cookie: {},
    genid: () => uuidv4(),
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionOpt));
app.use(passport.initialize());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use("/", indexRouter);

const startServer = () =>
    app.listen(3030, () => logger.INFO("Server started successfully."));

export default startServer;
