import express from "express"
import { userAddController, userDeleteCotnroller, userEditController, userViewByIdController, userViewController } from "../controller/index.js"
import { checkRole, checkToken } from "../middleware/index.js"
import { userValidation, uuidValidation, validate } from "../validation/index.js"
export const userRoutes = express.Router()


userRoutes.post("/add",
    checkToken,
    checkRole("admin"),
    userValidation,
    validate,
    userAddController)


userRoutes.get("/view", checkToken, checkRole("admin","manager"), userViewController)

userRoutes.get("/view/:id",
    checkToken,
    checkRole("admin","manager"),
    uuidValidation,
    validate,
    userViewByIdController)

userRoutes.delete("/delete/:id",
    checkToken,
    checkRole("admin"),
    uuidValidation,
    validate,
    userDeleteCotnroller)

userRoutes.put("/edit/:id",
    uuidValidation,
    userValidation,
    validate,
    checkToken,
    checkRole("admin"),
    userEditController
)