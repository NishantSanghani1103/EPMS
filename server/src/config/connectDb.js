import { app } from "../app.js";
import { sequelize } from "./index.js";

export const connectDb = async () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server Running On Port : ${process.env.PORT}`);
        });

        await sequelize.authenticate();
        console.log("PostgreSQL Connected Successfully");

        await sequelize.sync({ alter: true })
        console.log("Table Modified");




    } catch (error) {
        console.log("Database Connection Error:", error.message);
        process.exit(1);
    }
};