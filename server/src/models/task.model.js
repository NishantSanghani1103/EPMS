import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";
import { projectModel } from "./project.model.js";
import { userModel } from "./user.model.js";


export const taskModel = sequelize.define(
    "task",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        projectId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: projectModel,
                key: "id"
            }
        },

        assignedTo: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: userModel,
                key: "id"
            }
        },

        createdBy: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: userModel,
                key: "id"
            }
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,

        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,

        },

        priority: {
            type: DataTypes.ENUM("low", "medium", "high", "critical"),
            allowNull: false,
            defaultValue: "medium",
        },

        status: {
            type: DataTypes.ENUM(
                "todo",
                "in_progress",
                "review",
                "completed",
                "cancelled"
            ),
            allowNull: false,
            defaultValue: "todo",
        },

        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

        estimatedHours: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
            defaultValue: 0,
        },

        actualHours: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
            defaultValue: 0,
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: true,
    }
);

