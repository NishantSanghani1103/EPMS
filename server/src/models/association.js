import { departmentModel, projectMemberModel, projectModel, userModel } from "./index.js";

departmentModel.hasMany(userModel, {
    as: "users",
    foreignKey: "departmentId",
});

userModel.belongsTo(departmentModel, {
    as: "deparmentId",
    foreignKey: "departmentId",
});


// for the project

userModel.hasOne(projectModel, {
    as: "project",
    foreignKey: "managerId"
})

projectModel.belongsTo(userModel, {
    as: "manager",
    foreignKey: "managerId"
})


departmentModel.hasMany(projectModel, {
    as: "project",
    foreignKey: "departmentId"
})

projectModel.belongsTo(departmentModel, {
    as: "department",
    foreignKey: "departmentId"
})



userModel.hasMany(projectMemberModel, {
    as: "projectMember",
    foreignKey: "userId"
})

projectMemberModel.belongsTo(userModel, {
    as: "user",
    foreignKey: "userId"
})



// for the projectMember.


projectModel.hasMany(projectMemberModel, {
    as: "projectMembers",
    foreignKey: "projectId"
});

projectMemberModel.belongsTo(projectModel, {
    as: "project",
    foreignKey: "projectId"
});