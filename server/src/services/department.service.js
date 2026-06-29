import { messages } from "../messages/index.js"
import { departmentModel } from "../models/index.js"

export const departmentAddService = async (data) => {
    try {
        const { name } = data
        const checkDept = await departmentModel.findOne({
            where: {
                name
            }
        })
        if (checkDept) {
            return {
                status: false,
                statusCode: 401,
                message: messages.dept.DEPT_ALREADY_EXIST
            }
        }
        const res = await departmentModel.create(data)

        return {
            status: true,
            dataRes: res
        }
    } catch (error) {
        throw error
    }
}

export const departmentViewService = async () => {
    try {
        const data = await departmentModel.findAll({order:[["createdAt","DESC"]]})
        return data
    } catch (error) {
        throw error
    }
}


export const departmentEditService = async (id, data) => {
    try {
        const checkDept = await departmentModel.findByPk(id)

        if (!checkDept) {
            return {
                status: false,
                statusCode: 401,
                message: messages.dept.DEPT_NOT_FOUND
            }
        }

        if (checkDept.name === data.name) {
            return {
                status: false,
                statusCode: 401,
                message: messages.dept.DEPT_ALREADY_EXIST
            }
        }
        const checkDuplicateDept = await departmentModel.findOne({
            where: {
                name: data.name
            }
        })
        if (checkDuplicateDept) {
            return {
                status: false,
                statusCode: 401,
                message: messages.dept.DEPT_ALREADY_EXIST
            }
        }
        await checkDept.update(data)
        return {
            status: true
        }
    } catch (error) {
        throw error
    }
}

export const departmentDeleteService = async (id) => {
    try {
        const checkDept = await departmentModel.findByPk(id)
        console.log(checkDept);

        if (!checkDept) {
            return {
                status: false,
                statusCode: 401,
                message: messages.dept.DEPT_NOT_FOUND
            }
        }
        await checkDept.destroy()
        return {
            status: true
        }
    } catch (error) {
        throw error
    }
}