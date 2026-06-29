import { messages } from "../messages/index.js"
import { response } from "../utils/index.js"
import jwt from "jsonwebtoken"
export const checkToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        console.log(token);
        

        if (!token) {
            return response(res, {
                status: false,
                statusCode: 401,
                message: messages.general.TOKEN_ERROR
            })
        }
        const decode = jwt.verify(token, process.env.TOKENKEY)

        req.user = decode
        next()
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 401,
            message: error.message
        });
    }
}