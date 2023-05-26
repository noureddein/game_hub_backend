import express from "express";
import passport from "passport";
import cors, { type CorsOptions } from "cors";
import session, { type SessionOptions } from "express-session";
import { v4 as uuidv4 } from "uuid";

import logger from "./logger";
import indexRouter from "../routers";

// TypeScript feature
//side effect import
import "../middleware/auth.mw"; // This will run the strategy when the server run!

const app = express();

const sessionOpt: SessionOptions = {
    secret: "keyboard cat",
    cookie: {
        maxAge: 86400 * 1000 
    },
    genid: () => uuidv4(),
    resave: false,
    saveUninitialized: true,
};

const corsOpt: CorsOptions = {
    credentials: true,
    origin: ["http://localhost:5173"],
    exposedHeaders: ["auth-token"],
};

app.use(session(sessionOpt));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors(corsOpt));
app.use("/", indexRouter);

const startServer = () =>
    app.listen(3030, () => logger.INFO("Server started successfully."));

export default startServer;
