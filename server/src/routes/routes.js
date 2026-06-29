import express from "express"
import { authRoutes, deparmentRoutes, userRoutes } from "./index.js"
import { checkRole, checkToken } from "../middleware/index.js"

export const routes = express.Router()

routes.use("/user", userRoutes)
routes.use("/auth", authRoutes)
routes.use("/department", checkToken, checkRole("admin"), deparmentRoutes)