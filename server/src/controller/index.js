import { loginController, registerController } from "./auth.controller.js";
import { departmentAddController, departmentDeleteController, departmentEditController, departmentViewByIdController, departmentViewController } from "./department.controller.js";
import { projectAddController } from "./project.controller.js";
import { userAddController, userDeleteCotnroller, userEditController, userViewByIdController, userViewController } from "./user.controller.js";

export {
    registerController,
    loginController,
    departmentAddController,
    departmentEditController,
    departmentDeleteController,
    departmentViewController,
    departmentViewByIdController,
    userViewController,
    userAddController,
    userDeleteCotnroller,
    userViewByIdController,
    userEditController,
    projectAddController
}