import express from "express"
import { projectAddController } from "../controller/index.js"
export const projectRoutes = express.Router()


projectRoutes.post("/add",projectAddController)