import { messages } from "../messages/index.js"
import { departmentModel, projectMemberModel, projectModel, userModel } from "../models/index.js"

export const projectAddService = async (data) => {
    try {
        const { departmentId, managerId } = data

        const checkDept = await departmentModel.findByPk(departmentId)
        const checkUser = await userModel.findByPk(managerId)
        if (!checkDept) {
            return {
                status: false,
                statusCode: 401,
                message: messages.dept.DEPT_NOT_FOUND
            }
        }
        if (!checkUser) {
            return {
                status: false,
                statusCode: 401,
                message: messages.user.USER_NOT_FOUND
            }
        }


        const res = await projectModel.create(data)

        return {
            status: true,
            res
        }

    } catch (error) {
        throw error
    }
}

export const projectViewService = async () => {
    try {
        const data = await projectModel.findAll({
            include: [
                {
                    model: userModel,
                    as: "manager",
                    attributes: ["firstName", "lastName"]
                },
                {
                    model: departmentModel,
                    as: "department",
                    attributes: ["name"]
                },
                {
                    model:projectMemberModel,
                    as:"projectMembers"
                }
            ],
            order: [["createdAt", "DESC"]]
        })

        return data
    } catch (error) {
        throw error
    }
}


export const projectViewByIdService = async (managerId) => {
    try {
        const checkManager = await userModel.findByPk(managerId)

        if (!checkManager) {
            return {
                status: false,
                statusCode: 401,
                message: messages.user.USER_NOT_FOUND
            }
        }
        const data = await projectModel.findAll({
            where: {
                managerId
            },
            include: [
                {
                    model: departmentModel,
                    as: "department",
                    attributes: ["name"]
                }
            ]
        })
        return { status: true, dataRes: data }
    } catch (error) {
        throw error
    }
}


export const projectSingleViewService = async (id) => {
    try {
        const data = await projectModel.findByPk(id, {
            include: [
                {
                    model: userModel,
                    as: "manager",
                    attributes: ["firstName", "lastName"]
                },
                {
                    model: departmentModel,
                    as: "department",
                    attributes: ["name"]
                },
                {
                    model:projectMemberModel,
                    as:"projectMembers"
                }
            ]
        })

        return data
    } catch (error) {
        throw error
    }
}