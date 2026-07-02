import { messages } from "../messages/index.js"
import { projectMemberAddService, projectMemberViewByProjectIdService, projectMemberViewService } from "../services/projectMember.service.js"
import { response } from "../utils/index.js"

export const projectMemberAddCotnroller = async (req, res) => {
    try {
        const data = await projectMemberAddService(req.body)

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
            message: messages.projectMember.PROJECT_MEMBER_ADDED,
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

export const projectMemberViewController = async (req, res) => {
    try {
        const data = await projectMemberViewService()

        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.projectMember.PROJECT_MEMBER_VIEWD,
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

export const projectMemberViewByProjectIdController = async (req, res) => {
    try {
        const { projectId } = req.params
        console.log(projectId);
        
        const data = await projectMemberViewByProjectIdService(projectId)


        if (!data.status) {
            return response(res, {
                status: false,
                statusCode: data.statusCode,
                message: data.message
            })
        }

        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.projectMember.PROJECT_MEMBER_VIEWD,
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