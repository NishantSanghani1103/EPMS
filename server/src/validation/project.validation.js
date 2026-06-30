import { body } from "express-validator";

export const projectValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Project name is required.")
        .isLength({ min: 2, max: 100 })
        .withMessage("Project name must be between 2 and 100 characters."),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage("Description cannot exceed 1000 characters."),

    body("departmentId")
        .notEmpty()
        .withMessage("Department is required.")
        .isUUID()
        .withMessage("Invalid department ID."),

    body("managerId")
        .notEmpty()
        .withMessage("Manager is required.")
        .isUUID()
        .withMessage("Invalid manager ID."),

    body("startDate")
        .notEmpty()
        .withMessage("Start date is required.")
        .isISO8601()
        .withMessage("Invalid start date.")
        .toDate(),

    body("endDate")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("Invalid end date.")
        .toDate(),

    body("status")
        .optional()
        .isIn([
            "planned",
            "in_progress",
            "completed",
            "on_hold",
            "cancelled",
        ])
        .withMessage("Invalid project status."),
]