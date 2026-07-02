import { messages } from "../messages/index.js"
import { projectModel, userModel } from "../models/index.js"

export const taskAddService = async (data) => {
    try {
        const { projectId, assignedTo } = data

        const checkProject = await projectModel.findByPk(projectId)

        if (!checkProject) {
            return {
                status: false,
                statusCode: 401,
                message: messages.project.PROJECT_NOT_FOUND
            }
        }
        

    } catch (error) {
        throw error
    }
}