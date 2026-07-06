import { messages } from "../messages/index.js";
import { response } from "../utils/index.js";

export const checkRole = (...roles) => {
    return (req, res, next) => {
        // console.log(roles);
        // console.log(req.user);
        if (roles.includes(req.user.role)) {
           return next()
        }
        return response(res, {
            status: false,
            statusCode: 401,
            message: `${messages.general.UNAUTHORIZED} For ${req?.user?.role}`
        })
    }
}