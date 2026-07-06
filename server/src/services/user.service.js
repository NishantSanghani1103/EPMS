import { Op } from "sequelize"
import { departmentModel, projectMemberModel, projectModel, taskModel, userModel } from "../models/index.js"
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


        const encryptedPassword = await hashedPassword(password)


        const res = await userModel.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: encryptedPassword,
            role: data.role,
            departmentId: data.departmentId
        })

        return {
            status: true,
            res
        }


    } catch (error) {
        throw error
    }
}


export const userViewService = async (paramsData) => {
    try {
        const { type } = paramsData
        console.log(paramsData);
        const whereCondition = {}

        if (type) {
            whereCondition.role = type;
        } else {
            whereCondition.role = {
                [Op.not]: "admin"
            };
        }
        const data = await userModel.findAll(
            {
                where: whereCondition,
                include: [
                    {
                        model: departmentModel,
                        as: "deparmentId",
                        attributes: ["name"]
                    },
                    {
                        model: taskModel,
                        as: "task"
                    },
                    {
                        model: projectMemberModel,
                        as: "projectMember",
                        include: [
                            {
                                model: projectModel,
                                as: "project"
                            }
                        ]
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
        const userData = await userModel.findByPk(id, {
            include: [
                {
                    model: departmentModel,
                    as: "deparmentId",
                    attributes: ["name"]
                }
            ]
        })

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
        const res = await userModel.update({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: encrptedPassword,
            role: data.role,
            departmentId: data.departmentId
        }, {
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

export const userViewByTokenService = async (id) => {
    try {
        const res = await userModel.findByPk(id, {
            include: [
                {
                    model: departmentModel,
                    as: "deparmentId",
                    attributes: ["name"]
                },
                {
                    model: taskModel,
                    as: "task"
                },
                {
                    model: projectMemberModel,
                    as: "projectMember",
                    include: [
                        {
                            model: projectModel,
                            as: "project"
                        }
                    ]
                }
            ]
        })

        return res
    } catch (error) {
        throw error
    }
}


export const userEditByTokenService = async (id, data) => {
    try {
        console.log(data);

        const res = await userModel.update({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            profileImage:data.profileImage
        },
            {
                where: {
                    id
                }
            }
        )

        return {
            status: true,
            res
        }
    } catch (error) {
        throw error
    }
}