import { messages } from "../messages/index.js"
import { projectMemberModel, projectModel, userModel } from "../models/index.js"

export const projectMemberAddService = async (data) => {
    try {
        const { projectId, userId } = data

        const checkProject = await projectModel.findByPk(projectId)


        if (!checkProject) {
            return {
                status: false,
                statusCode: 401,
                message: messages.project.PROJECT_NOT_FOUND
            }
        }

        const checkUser = await userModel.findByPk(userId)

        if (!checkUser) {
            return {
                status: false,
                statusCode: 401,
                message: messages.user.USER_NOT_FOUND
            }
        }
        // console.log(checkUser);

        const checkProjectMember = await projectMemberModel.findOne({
            where: {
                userId,
                projectId
            }
        })
        if (checkProjectMember) {
            return {
                status: false,
                statusCode: 401,
                message: messages.projectMember.PROJECT_MEMBER_EXIST
            }
        }
        const res = await projectMemberModel.create(data)

        return {
            status: true,
            res
        }
    } catch (error) {
        throw error
    }
}

export const projectMemberViewService = async () => {
    try {
        const data = await projectMemberModel.findAll({
            include: [
                {
                    model: userModel,
                    as: "user",
                    attributes: ["firstName", "lastName"]
                },
                {
                    model: projectModel,
                    as: "project",
                    attributes: ["name"]
                }
            ]
        })

        return data
    } catch (error) {
        throw error
    }
}

export const projectMemberViewByProjectIdService = async (projectId) => {
    try {
        const checkProject = await projectModel.findByPk(projectId)

        if (!checkProject) {
            return {
                status: false,
                statusCode: 401,
                message: messages.project.PROJECT_NOT_FOUND
            }
        }

        const res = await projectMemberModel.findAll({
            where: {
                projectId
            },
            include: [
                {
                    model: userModel,
                    as: "user",
                    attributes: ["firstName", "lastName", "email", "profileImage", "profileImageUrl","status"]
                },
                {
                    model: projectModel,
                    as:"project",
                    attributes:["name"]
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