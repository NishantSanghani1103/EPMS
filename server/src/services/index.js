import { departmentAddService, departmentDeleteService, departmentEditService, departmentViewByIdService, departmentViewService } from "./department.service.js";
import { forgotPasswordService, loginService } from "./login.service.js";
import { projectAddService, projectDeleteService, projectEditService, projectSingleViewService, projectViewByIdService, projectViewService } from "./project.service.js";
import { projectMemberAddService, projectMemberViewByProjectIdService, projectMemberViewService } from "./projectMember.service.js";
import { registerService } from "./register.service.js";
import { taskAddService, taskViewByManagerAndProjectIdService, taskViewByTokenService, taskViewService } from "./task.service.js";
import { userAddService, userDeleteService, userEditByTokenService, userEditService, userGetByIdService, userViewByTokenService, userViewService } from "./user.service.js";

export {
    registerService,
    loginService,
    forgotPasswordService,

    departmentAddService,
    departmentEditService,
    departmentDeleteService,
    departmentViewService,
    departmentViewByIdService,

    userViewService,
    userAddService,
    userDeleteService,
    userGetByIdService,
    userEditService,
    userViewByTokenService,
    userEditByTokenService,

    projectAddService,
    projectViewService,
    projectViewByIdService,
    projectMemberAddService,
    projectMemberViewService,
    projectSingleViewService,
    projectMemberViewByProjectIdService,
    projectEditService,
    projectDeleteService,

    taskAddService,
    taskViewService,
    taskViewByManagerAndProjectIdService,
    taskViewByTokenService,

}