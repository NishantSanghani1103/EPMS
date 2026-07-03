import { departmentAddService, departmentDeleteService, departmentEditService, departmentViewByIdService, departmentViewService } from "./department.service.js";
import { loginService } from "./login.service.js";
import { projectAddService, projectSingleViewService, projectViewByIdService, projectViewService } from "./project.service.js";
import { projectMemberAddService, projectMemberViewByProjectIdService, projectMemberViewService } from "./projectMember.service.js";
import { registerService } from "./register.service.js";
import { taskAddService, taskViewByManagerAndProjectIdService, taskViewByTokenService, taskViewService } from "./task.service.js";
import { userAddService, userDeleteService, userEditByTokenService, userEditService, userGetByIdService, userViewByTokenService, userViewService } from "./user.service.js";

export {
    registerService,
    loginService,

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

    taskAddService,
    taskViewService,
    taskViewByManagerAndProjectIdService,
    taskViewByTokenService,
    
}