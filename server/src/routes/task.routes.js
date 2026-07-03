import express from "express"
import { taskAddController, taskViewByEmpController, taskViewByManagerAndProjectIdController, taskViewController } from "../controller/index.js"
import { checkRole, checkToken } from "../middleware/index.js"
export const taskRoutes = express.Router()
taskRoutes.post("/add", checkToken, checkRole("manager"), taskAddController)
taskRoutes.get("/view", checkToken, checkRole("admin"), taskViewController)

taskRoutes.get("/viewBy-manager-projectId/:projectId", checkToken, checkRole("manager"), taskViewByManagerAndProjectIdController)


taskRoutes.get("/viewByEmp", checkToken, checkRole("employee"), taskViewByEmpController)