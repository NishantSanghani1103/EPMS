import { messages } from "../messages/index.js"
import { userAddService, userDeleteService, userEditService, userGetByIdService, userViewService } from "../services/index.js"
import { response } from "../utils/index.js"

export const userViewController = async (req, res) => {
    try {
        const data = await userViewService(req.query)

        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.user.USER_VIEWD,
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


export const userAddController = async (req, res) => {
    try {
        const data = await userAddService(req.body)

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
            message: messages.user.USER_ADDED,
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

export const userViewByIdController = async (req, res) => {
    try {
        const { id } = req.params
        const data = await userGetByIdService(id)

        if (!data.status) {
            return response(res, {
                status: data.status,
                statusCode: data.statusCode,
                message: data.message
            })
        }

        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.user.USER_VIEWD,
            data: data.userData
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}

export const userDeleteCotnroller = async (req, res) => {
    try {
        const { id } = req.params
        const data = await userDeleteService(id)

        if (!data.status) {
            return response(res, {
                status: data.status,
                statusCode: data.statusCode,
                message: data.message
            })
        }
        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.user.USER_DELETED
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}


export const userEditController = async (req, res) => {
    try {
        const { id } = req.params
        const data = await userEditService(id, req.body)
        console.log(data);

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
            message: messages.user.USER_EDITED,
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