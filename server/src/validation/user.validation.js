import { body } from "express-validator";

export const userValidation = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("First name must be between 2 and 50 characters"),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Last name must be between 2 and 50 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),

    body("phone")
        .optional()
        .trim()
        .isMobilePhone("any")
        .withMessage("Please provide a valid phone number"),

    body("role")
        .optional()
        .isIn(["admin", "manager", "employee"])
        .withMessage("Invalid role"),

    body("departmentId")
        .notEmpty()
        .withMessage("Department Is Required")
        .isUUID()
        .withMessage("Department ID must be a valid UUID"),

    body("status")
        .optional()
        .isIn(["active", "inactive", "suspended"])
        .withMessage("Invalid status"),

    body("profileImage")
        .optional()
        .isString()
        .withMessage("Profile image must be a string"),
];
export const userLoginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
]