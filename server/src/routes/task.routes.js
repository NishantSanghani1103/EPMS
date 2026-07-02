import express from "express"
import { taskAddController } from "../controller/index.js"
import { checkRole, checkToken } from "../middleware/index.js"
export const taskRoutes = express.Router()
taskRoutes.post("/add", checkToken, checkRole("manager"), taskAddController)