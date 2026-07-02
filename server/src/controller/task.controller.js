import { messages } from "../messages/index.js"
import { response } from "../utils/index.js"

export const taskAddController = async (req, res) => {
    try {
        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.task.TASK_ADDED
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}