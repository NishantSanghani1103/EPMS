import express from "express"
import cors from "cors"
import { routes } from "./routes/routes.js"
export const app = express()
app.use(express.json())
app.use(cors())
app.use("/api", routes)



// image permission

app.use("/uploads/user", express.static("uploads/user"))