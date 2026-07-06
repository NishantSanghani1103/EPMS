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

export const projectViewService = async (departmentId) => {
    try {
        const whereCondition = {}
        if(departmentId){
            whereCondition.departmentId=departmentId
        }
        const data = await projectModel.findAll({
            where: whereCondition,
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
                    model: projectMemberModel,
                    as: "projectMembers"
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
                    model: projectMemberModel,
                    as: "projectMembers"
                }
            ]
        })

        return data
    } catch (error) {
        throw error
    }
}

export const projectEditService = async (id, data) => {
    try {
        const checkprojecct = await projectModel.findByPk(id)

        if (!checkprojecct) {
            return {
                status: false,
                statusCode: 401,
                message: messages.project.PROJECT_NOT_FOUND
            }
        }
        const res = await projectModel.update(data, {

            where: {
                id
            }
        })

        return {
            status: true,
            res
        }
    } catch (error) {
        throw error
    }
}

export const projectDeleteService = async (id) => {
    try {
        console.log(id);

        const checkProject = await projectModel.findByPk(id)
        console.log(checkProject);


        if (!checkProject) {
            return {
                status: false,
                statusCode: 401,
                message: messages.project.PROJECT_NOT_FOUND
            }
        }
        const res = await checkProject.destroy()

        return {
            status: true,
            res
        }
    } catch (error) {
        throw error
    }
}