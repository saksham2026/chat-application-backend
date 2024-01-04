import express from "express";
import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser());
app.use(express.json());



app.get('/', (request, response)=>{
    response.send("Hello I am Backend")
});


export { app };