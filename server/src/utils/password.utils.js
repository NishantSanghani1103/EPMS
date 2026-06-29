import bcrypt from "bcrypt"
export const hashedPassword = (password, salt = 10) => {
    return bcrypt.hashSync(password, salt)
};

export const orignalPassword = (password, dbPassword) => {
    return bcrypt.compare(password, dbPassword);
}