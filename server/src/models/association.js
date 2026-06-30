import { departmentModel, userModel } from "./index.js";

departmentModel.hasMany(userModel, {
    as: "users",
    foreignKey: "departmentId",
});

userModel.belongsTo(departmentModel, {
    as: "deparmentId",
    foreignKey: "departmentId",
});



