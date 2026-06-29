import { departmentModel, userModel } from "./index.js";

userModel.hasMany(departmentModel, {
    as: "deparmentId",
    foreignKey: "userId"
})
departmentModel.belongsTo(userModel, {
    as: "user",
    foreignKey: "userId"
})