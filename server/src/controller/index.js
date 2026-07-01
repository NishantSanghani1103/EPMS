import { loginController, registerController } from "./auth.controller.js";
import { departmentAddController, departmentDeleteController, departmentEditController, departmentViewByIdController, departmentViewController } from "./department.controller.js";
import { projectAddController, projectSingleViewController, projectViewByIdController, projectViewController } from "./project.controller.js";
import { projectMemberAddCotnroller, projectMemberViewController } from "./projectMember.controller.js";
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
    projectAddController,
    projectViewController,
    projectViewByIdController,
    projectMemberAddCotnroller,
    projectMemberViewController,
    projectSingleViewController
}