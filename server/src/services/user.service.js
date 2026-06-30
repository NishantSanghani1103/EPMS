import { Op } from "sequelize"
import { departmentModel, userModel } from "../models/index.js"
import { messages } from "../messages/index.js"
import { hashedPassword } from "../utils/password.utils.js"


export const userAddService = async (data) => {
    try {
        const { email, password, confirmPassword, departmentId } = data
        const checkUser = await userModel.findOne({
            where: {
                email
            }
        })
        const checkDept = await departmentModel.findByPk(departmentId)
        if (checkUser) {
            return {
                status: false,
                statusCode: 401,
                message: messages.user.USER_ALREADY_EXIST
            }
        }
        if (!checkDept) {
            return {
                status: false,
                statusCode: 401,
                message: messages.dept.DEPT_NOT_FOUND
            }
        }
        if (password !== confirmPassword) {
            return {
                status: false,
                statusCode: 401,
                message: messages.general.VALIDATION_ERROR
            }
        }
        const res = await userModel.create(data)

        return {
            status: true,
            res
        }


    } catch (error) {
        throw error
    }
}


export const userViewService = async () => {
    try {
        const data = await userModel.findAll(
            {
                where: {
                    role: {
                        [Op.not]: "admin"
                    }
                },
                include: [
                    {
                        model: departmentModel,
                        as: "deparmentId",
                        attributes: ["name"]
                    }
                ]
            }
        )
        return data
    } catch (error) {
        throw error
    }
}


export const userGetByIdService = async (id) => {
    try {
        const userData = await userModel.findByPk(id)

        if (!userData) {
            return {
                status: false,
                statusCode: 401,
                message: messages.user.USER_NOT_FOUND
            }
        }

        return {
            status: true,
            userData
        }
    } catch (error) {
        throw error
    }
}

export const userDeleteService = async (id) => {
    try {

        const checkUser = await userModel.findByPk(id)
        if (!checkUser) {
            return {
                status: false,
                statusCode: 401,
                message: messages.user.USER_NOT_FOUND
            }
        }
        const data = await userModel.destroy({
            where: {
                id
            }
        })

        return {
            status: true
        }
    } catch (error) {
        throw error
    }
}


export const userEditService = async (id, data) => {
    try {
        const { password, confirmPassword, departmentId } = data
        const checkUser = await userModel.findByPk(id)
        const checkDept = await departmentModel.findByPk(departmentId)
        if (!checkUser) {
            return {
                status: false,
                statusCode: 401,
                message: messages.user.USER_NOT_FOUND
            }
        }
        if (!checkDept) {
            return {
                status: false,
                statusCode: 401,
                message: messages.dept.DEPT_NOT_FOUND
            }
        }
        if (password !== confirmPassword) {
            return {
                status: false,
                statusCode: 401,
                message: messages.general.VALIDATION_ERROR
            }
        }

        const encrptedPassword = await hashedPassword(password)
        const res = await userModel.update({ ...data, password: encrptedPassword }, {
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