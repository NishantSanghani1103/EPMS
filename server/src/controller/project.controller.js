import { messages } from "../messages/index.js"
import { projectAddService, projectSingleViewService, projectViewByIdService, projectViewService } from "../services/project.service.js"
import { response } from "../utils/index.js"

export const projectAddController = async (req, res) => {
    try {
        const data = await projectAddService(req.body)


        if (!data.status) {
            return response(res, {
                status: data.status,
                statusCode: data.statusCode,
                message: data.message
            })
        }

        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.project.PROJECT_ADDED,
            data: data.res
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error, message
        })
    }
}

export const projectViewController = async (req, res) => {
    try {
        const data = await projectViewService()

        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.project.PROJECT_VIEWD,
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

export const projectViewByIdController = async (req, res) => {
    try {

        const data = await projectViewByIdService(req.user.id)

        if (!data.status) {
            return {
                status: data.status,
                statusCode: data.statusCode,
                message: data.message
            }
        }

        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.project.PROJECT_VIEWD,
            data: data.dataRes
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}

export const projectSingleViewController = async (req, res) => {
    try {
        const { id } = req.params
        const data = await projectSingleViewService(id)

        
        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.project.PROJECT_VIEWD,
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