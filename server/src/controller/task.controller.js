import { messages } from "../messages/index.js"
import { taskAddService, taskViewByManagerAndProjectIdService, taskViewByTokenService, taskViewService } from "../services/index.js"
import { response } from "../utils/index.js"

export const taskAddController = async (req, res) => {
    try {
        const { id } = req.user
        const data = await taskAddService(id, req.body)

        if (!data.status) {
            return {
                status: data.status,
                statusCode: data.statusCode,
                message: data.message
            }
        }

        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.task.TASK_ADDED
        })

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


export const taskViewController = async (req, res) => {
    try {
        const data = await taskViewService()


        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.task.TASK_VIEWD,
            data
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}


export const taskViewByManagerAndProjectIdController = async (req, res) => {
    try {
        const { projectId } = req.params
        const { id } = req.user
        const data = await taskViewByManagerAndProjectIdService(projectId, id)


        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.task.TASK_VIEWD,
            data: data.res
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}



export const taskViewByEmpController = async (req, res) => {
    try {
        const { id } = req.user
        const data = await taskViewByTokenService(id)


        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.task.TASK_VIEWD,
            data
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}