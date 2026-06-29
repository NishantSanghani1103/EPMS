import { messages } from "../messages/index.js"
import { departmentAddService, departmentDeleteService, departmentEditService, departmentViewService } from "../services/index.js"
import { response } from "../utils/index.js"

export const departmentAddController = async (req, res) => {
    try {
        const data = await departmentAddService(req.body)
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
            message: messages.dept.DEPT_CREATED,
            data: data.dataRes
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}
export const departmentViewController = async (req, res) => {
    try {
        const data = await departmentViewService()

        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.dept.DEPT_VIEWD,
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
export const departmentEditController = async (req, res) => {
    try {
        const { deptId } = req.params
        const data = await departmentEditService(deptId, req.body)
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
            message: messages.dept.DEPT_UPDATED,
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


export const departmentDeleteController = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);

        const data = await departmentDeleteService(id)
        console.log();

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
            message: messages.dept.DEPT_DELETED,
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