import express from "express"
export const userRoutes = express.Router()

userRoutes.get("/view", (req, res) => {
    return res.status(200).json({
        status: true,
        message: "User Viewd SuccessFulklyy....!!"
    })
})