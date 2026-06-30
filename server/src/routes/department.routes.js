import express from "express"
import { departmentAddController, departmentDeleteController, departmentEditController, departmentViewByIdController, departmentViewController } from "../controller/index.js"
import { departmentValidation, uuidValidation, validate } from "../validation/index.js"
export const deparmentRoutes = express.Router()

deparmentRoutes.post("/add", departmentValidation, validate, departmentAddController)
deparmentRoutes.get("/view", departmentViewController)
deparmentRoutes.get("/view/:id", uuidValidation, validate, departmentViewByIdController)
deparmentRoutes.put("/edit/:deptId", departmentValidation, validate, departmentEditController)
deparmentRoutes.delete("/delete/:id", uuidValidation, validate, departmentDeleteController)