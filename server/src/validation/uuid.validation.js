import { param } from "express-validator";

export const uuidValidation = [
    param("id")
        .optional()
        .isUUID()
        .withMessage(`UUID is invalid`)
]