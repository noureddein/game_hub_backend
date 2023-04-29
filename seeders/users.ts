
import logger from "../services/logger";
import db from "../models";
import { hashPassword } from "../utils/passwordUtils";

export const createUsers = () =>
    users.map(async (user) => {
        try {

            const isUserExist = await db.User.findOne({
                where: { email: user.email },
                raw: true,
            });
            
            if (!isUserExist) {
                const userWithHashedPassword = {...user, password: await hashPassword(user.password)}
                await db.User.create(userWithHashedPassword);
                logger.INFO(`User ${user.username} created successfully.`);
            }
            logger.ERROR(`User ${user.username} already exist!.`);
        } catch (error) {
            logger.ERROR("Failed to create users");
            console.log(error);
        }
    });

export const users = [
    {
        first_name: "Nour eddein",
        last_name: "Al Abbassi",
        username: "noureddein",
        email: "noureddein@gmail.com",
        password: "1234567",
    },
    {
        first_name: "Mohammed",
        last_name: "Al Abbassi",
        username: "mhmd",
        email: "mhmd@gmail.com",
        password: "1234567",
    },
];
