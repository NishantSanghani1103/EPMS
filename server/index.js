import dotEnv from "dotenv"
import { connectDb } from "./src/config/index.js"
import { app } from "./src/app.js"
import * as db from "./src/models/index.js"
import * as realtion from "./src/models/association.js"
dotEnv.config()
connectDb()

