import express from "express"
import { userAddController, userDeleteCotnroller, userEditByTokenController, userEditController, userViewByIdController, userViewByTokenController, userViewController } from "../controller/index.js"
import { checkRole, checkToken } from "../middleware/index.js"
import { userValidation, uuidValidation, validate } from "../validation/index.js"

export const userRoutes = express.Router()


userRoutes.post("/add",
    checkToken,
    checkRole("admin"),
    userValidation,
    validate,
    userAddController)


userRoutes.get("/view", checkToken, checkRole("admin", "manager"), userViewController)

userRoutes.get("/view/:id",
    checkToken,
    checkRole("admin", "manager"),
    uuidValidation,
    validate,
    userViewByIdController)


userRoutes.get("/viewByToken", checkToken, checkRole("employee"), userViewByTokenController)

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


userRoutes.put("/editByToken",
    uuidValidation,
    userValidation,
    validate,
    checkToken,
    checkRole("employee"),
    userEditByTokenController
)