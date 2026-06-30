import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";
import { departmentModel } from "./department.model.js";
import { userModel } from "./user.model.js";

export const projectModel = sequelize.define("project", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    departmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: departmentModel,
            key: "id"
        }
    },

    managerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: userModel,
            key: "id"
        }
    },

    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },

    status: {
        type: DataTypes.ENUM(
            "planned",
            "in_progress",
            "completed",
            "on_hold",
            "cancelled"
        ),
        allowNull: false,
        defaultValue: "planned",
    },

    createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
    },
},
    {
        timestamps: true,
    }
);
