import { app } from "./src/app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 6000 ;

app.listen(PORT, () => {
    console.log("App is listening to the port: ", PORT);
});



