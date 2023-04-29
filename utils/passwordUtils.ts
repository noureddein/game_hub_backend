import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
    try {
        const hashed = await bcrypt.hash(password, 12);
        return hashed;
    } catch (error) {
        console.log(error)
    }
};
