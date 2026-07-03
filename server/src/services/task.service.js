import { messages } from "../messages/index.js"
import { projectModel, taskModel, userModel } from "../models/index.js"

export const taskAddService = async (managerId, data) => {
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
        const res = await taskModel.create({ ...data, createdBy: managerId })

        return {
            status: true,
            res
        }

    } catch (error) {
        throw error
    }
}

export const taskViewService = async () => {
    try {
        const data = await taskModel.findAll({
            include: [
                {
                    model: userModel,
                    as: "user",
                    attributes: ["firstName", "lastName", "email", "profileImage", "profileImageUrl"]
                },
                {
                    model: userModel,
                    as: "taskCreated",
                    attributes: ["firstName", "lastName", "email", "profileImage", "profileImageUrl"]
                },
                {
                    model: projectModel,
                    as: "project",
                    attributes: ["name", "status", "startDate", "endDate"]
                }
            ]
        })

        return data
    } catch (error) {
        throw error
    }
}

export const taskViewByManagerAndProjectIdService = async (projectId, managerId) => {
    try {

        const res = await taskModel.findAll({
            where: {
                projectId,
                createdBy: managerId
            },
            include: [
                {
                    model: userModel,
                    as: "user",
                    attributes: ["firstName", "lastName", "email", "profileImage", "profileImageUrl"]
                },
                {
                    model: userModel,
                    as: "taskCreated",
                    attributes: ["firstName", "lastName", "email", "profileImage", "profileImageUrl"]
                },
                {
                    model: projectModel,
                    as: "project",
                    attributes: ["name", "status", "startDate", "endDate"]
                }
            ]
        })

        return {
            status: true,
            res
        }
    } catch (error) {
        throw error
    }
}


export const taskViewByTokenService = async (assignedTo) => {
    try {
        const res = await taskModel.findAll({
            where: {
                assignedTo
            },
            include: [
                {
                    model: userModel,
                    as: "user",
                    attributes: ["firstName", "lastName", "email", "profileImage", "profileImageUrl"]
                },
                {
                    model: userModel,
                    as: "taskCreated",
                    attributes: ["firstName", "lastName", "email", "profileImage", "profileImageUrl"]
                },
                {
                    model: projectModel,
                    as: "project",
                    attributes: ["name", "status", "startDate", "endDate"]
                }
            ]
        })
        return res
    } catch (error) {
        throw error
    }
}