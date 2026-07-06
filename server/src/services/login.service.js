import { messages } from "../messages/index.js"
import { userModel } from "../models/index.js"
import { hashedPassword, orignalPassword } from "../utils/index.js"
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

export const forgotPasswordService = async (data) => {
    try {
        console.log(data);
        
        const { email, password, confirmPassword } = data

        const checkUser =await userModel.findOne({
            where: {
                email
            }
        })
        console.log(checkUser);
        
        if (!checkUser) {
            return {
                status: false,
                statusCode: 401,
                message: messages.user.USER_NOT_FOUND
            }
        }
        if (password !== confirmPassword) {
            return {
                status: false,
                statusCode: 401,
                message: messages.auth.CONFIRM_PASSWORD_ERROR
            }
        }
        const encryptedPassword = await hashedPassword(password)

        const res = await userModel.update({
            password: encryptedPassword
        },
            {
                where: {
                    email
                }
            })
        return {
            status: true,
            res
        }
    } catch (error) {
        throw error
    }
}