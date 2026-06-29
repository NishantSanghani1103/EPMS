import { messages } from "../messages/index.js"
import { loginService, registerService } from "../services/index.js";
import fs from "fs";
import { response } from "../utils/index.js"

export const registerController = async (req, res) => {
    try {
        if (req.files && req.files.profileImage) {
            req.body.profileImage = req.files.profileImage[0].filename
        }
        const data = await registerService(req.body)
        // console.log(data);

        if (!data.status) {
            if (req.files && req.files.profileImage) {
                fs.unlink(`uploads/user/${req.files.profileImage[0].filename}`, (err) => {
                    if (err) {
                        console.error("Error deleting image:", err);
                    }
                });
            }
            return response(res, {
                status: data.status,
                statusCode: data.statusCode,
                message: data.message
            })
        }
        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.auth.SIGNUP_SUCCESS
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const data = await loginService(req.body)
        if (!data.status) {
            return response(res, {
                status: data.status,
                statusCode: data.statusCode,
                message: data.message
            })
        }
        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.auth.SIGNIN_SUCCESS,
            data: data.dataRes,
            token: data.token
        })

    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}