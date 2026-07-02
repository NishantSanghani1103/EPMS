import express from "express"
import { authRoutes, deparmentRoutes, projectMemberRoutes, projectRoutes, taskRoutes, userRoutes } from "./index.js"
import { checkRole, checkToken } from "../middleware/index.js"

export const routes = express.Router()

routes.use("/user", userRoutes)
routes.use("/auth", authRoutes)
routes.use("/department", checkToken, checkRole("admin"), deparmentRoutes)
routes.use("/project", projectRoutes)
routes.use("/project-member", projectMemberRoutes)
routes.use("/task", taskRoutes)