import { app } from "./src/app.js";
import dbConnect from "./database/db.connection.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

await dbConnect(MONGO_URI, DB_NAME);

const PORT = process.env.PORT || 6000 ;

app.listen(PORT, () => {
    console.log("App is listening to the port: ", PORT);
});



