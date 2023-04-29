import dotenv from "dotenv";

dotenv.config();

import startServer from "./services/server";
import logger from "./services/logger";
import db from "./models";
import { createUsers } from "./seeders/users";

db.sequelize.sync({ focus: true }).then(() => {
    logger.INFO("Database synced!");
    startServer();
});

createUsers();


logger.WARNING(`ENV: ${process.env.NODE_ENV}`);
