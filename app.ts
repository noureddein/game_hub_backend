import dotenv from "dotenv";

dotenv.config();

import startServer from "./services/server";
import logger from "./services/logger";
import db from "./models";
import { users } from "./seeders/users";

db.sequelize.sync().then(() => {
    logger.INFO("Database synced!");
    startServer();
});

const createUsers = () => users.map((user) => db.User.create(user));

createUsers()

logger.WARNING(`ENV: ${process.env.NODE_ENV}`);
