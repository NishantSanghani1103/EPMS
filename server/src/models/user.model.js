import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";
import { departmentModel } from "./index.js";

export const userModel = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },

        role: {
            type: DataTypes.ENUM("admin", "manager", "employee"),
            allowNull: false,
            defaultValue: "employee",
        },

        departmentId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: departmentModel,
                key: "id",
            },
        },

        profileImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        profileImageUrl: {
            type: DataTypes.VIRTUAL,
            get() {
                const image = this.getDataValue("profileImage");

                if (!image) return null;

                return `${process.env.USER_URL}/${image}`;
            },
        },
        status: {
            type: DataTypes.ENUM("active", "inactive", "suspended"),
            allowNull: false,
            defaultValue: "active",
        },
    },
    {
        timestamps: true
    }
);
