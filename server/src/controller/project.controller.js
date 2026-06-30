import { messages } from "../messages/index.js"
import { response } from "../utils/index.js"

export const projectAddController = async (req, res) => {
    try {
        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.project.PROJECT_ADDED
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error, message
        })
    }
}