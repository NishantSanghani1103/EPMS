import { messages } from "../messages/index.js"
import { userModel } from "../models/index.js"
import { orignalPassword } from "../utils/index.js"
import jwt from "jsonwebtoken"
export const loginService = async (data) => {
    try {
        const { email, password } = data
        const checkUser = await userModel.findOne({
            where: {
                email
            }
        })
        if (!checkUser) {
            return {
                status: false,
                statusCode: 401,
                message: messages.user.USER_NOT_FOUND
            }
        }
        const decryptedPassword = await orignalPassword(password, checkUser.password)

        if (!decryptedPassword) {
            return {
                status: false,
                statusCode: 401,
                message: messages.auth.INVALID_CREDENTIAL
            }
        }
        const userObj = {
            id: checkUser.id,
            name: checkUser.firstName,
            email: checkUser.email,
            role: checkUser.role
        }
        const token = jwt.sign(userObj, process.env.TOKENKEY)

        return {
            status: true,
            dataRes: userObj,
            token
        }

    } catch (error) {
        throw error
    }
}