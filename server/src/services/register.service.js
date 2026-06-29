import { messages } from "../messages/index.js";
import { userModel } from "../models/index.js";
import { hashedPassword } from "../utils/index.js";

export const registerService = async (data) => {
    try {
        console.log(data);
        const { email, password } = data
        const checkUser = await userModel.findOne({
            where: {
                email
            }
        })
        if (checkUser) {
            return {
                status: false,
                statusCode: 401,
                message: messages.user.USER_ALREADY_EXIST
            }
        }
        const encryptedPassword = await hashedPassword(password)
        const dataRes = await userModel.create({ ...data, password: encryptedPassword })
        return {
            status: true
        }

    } catch (error) {
        throw error
    }
}