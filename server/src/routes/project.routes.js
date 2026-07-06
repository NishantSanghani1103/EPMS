import express from "express"
import { projectAddController, projectDeleteController, projectEditController, projectSingleViewController, projectViewByIdController, projectViewController } from "../controller/index.js"
import { checkRole, checkToken } from "../middleware/index.js"
import { projectValidation, validate } from "../validation/index.js"
export const projectRoutes = express.Router()


projectRoutes.post("/add", checkToken, checkRole("admin"), projectValidation, validate, projectAddController)

projectRoutes.get("/view", projectViewController)

projectRoutes.get("/view/:id", checkToken, checkRole("admin", "manager"), projectSingleViewController)

projectRoutes.get("/viewByManager", checkToken, checkRole("manager"), projectViewByIdController)

projectRoutes.put("/edit/:id", checkToken, checkRole("admin"), projectEditController)

projectRoutes.delete("/delete/:id",checkToken,checkRole("admin"),projectDeleteController)