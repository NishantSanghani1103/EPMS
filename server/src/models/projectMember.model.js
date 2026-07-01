import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";
import { projectModel, userModel } from "./index.js";

export const projectMemberModel = sequelize.define("projectMember",
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

        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: userModel,
                key: "id"
            }
        },

        joinedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["projectId", "userId"],
            },
        ],
    }
);

