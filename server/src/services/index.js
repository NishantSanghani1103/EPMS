import { departmentAddService, departmentDeleteService, departmentEditService, departmentViewByIdService, departmentViewService } from "./department.service.js";
import { loginService } from "./login.service.js";
import { projectAddService, projectSingleViewService, projectViewByIdService, projectViewService } from "./project.service.js";
import { projectMemberAddService, projectMemberViewService } from "./projectMember.service.js";
import { registerService } from "./register.service.js";
import { userAddService, userDeleteService, userEditService, userGetByIdService, userViewService } from "./user.service.js";

export{
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
    projectAddService,
    projectViewService,
    projectViewByIdService,
    projectMemberAddService,
    projectMemberViewService,
    projectSingleViewService
}