import express from "express"
import { checkRole, checkToken } from "../middleware/index.js"
import { projectMemberAddCotnroller, projectMemberViewController } from "../controller/index.js"
export const projectMemberRoutes = express.Router()

projectMemberRoutes.post("/add", checkToken, checkRole("manager"), projectMemberAddCotnroller)
projectMemberRoutes.get("/view", checkToken, checkRole("manager"), projectMemberViewController)