import { body, param } from "express-validator";

export const departmentValidation = [
    param("deptId")
        .optional()
        .isUUID(),
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Department name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Department name must be between 2 and 100 characters"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),
]