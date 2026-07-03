import { loginController, registerController } from "./auth.controller.js";
import { departmentAddController, departmentDeleteController, departmentEditController, departmentViewByIdController, departmentViewController } from "./department.controller.js";
import { projectAddController, projectSingleViewController, projectViewByIdController, projectViewController } from "./project.controller.js";
import { projectMemberAddCotnroller, projectMemberViewByProjectIdController, projectMemberViewController } from "./projectMember.controller.js";
import { taskAddController, taskViewByEmpController, taskViewByManagerAndProjectIdController, taskViewController } from "./task.controller.js";
import { userAddController, userDeleteCotnroller, userEditByTokenController, userEditController, userViewByIdController, userViewByTokenController, userViewController } from "./user.controller.js";

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
    userViewByTokenController,
    userEditByTokenController,

    projectAddController,
    projectViewController,
    projectViewByIdController,
    projectMemberAddCotnroller,
    projectMemberViewController,
    projectSingleViewController,
    projectMemberViewByProjectIdController,

    taskAddController,
    taskViewController,
    taskViewByManagerAndProjectIdController,
    taskViewByEmpController
}