import express from "express"

import { loginController, registerController } from "../controller/index.js"
import { userValidation,userLoginValidation, validate } from "../validation/index.js"
import { uploadFiles } from "../utils/index.js"
import {  } from "../validation/user.validation.js"

export const authRoutes = express.Router()

authRoutes.post("/register",
    uploadFiles("user","profileImage",1),
    userValidation,
    validate,
    registerController)

authRoutes.post("/login",
    userLoginValidation,
    validate,
    loginController
)

