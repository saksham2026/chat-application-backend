import express from "express";
import cookieParser from "cookie-parser";

import cors from "cors";

import userRoutes from "../routers/user.routes.js";
import chatRoutes from "../routers/chat.router.js";
const app = express();

app.use(cors({
    origin: "http://localhost:5173" ,
    credentials: true,
}));

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());


app.use('/api/v1/user', userRoutes)
app.use('/api/v1/chat', chatRoutes)

app.use('/', (request, response)=>{
    response.send("Hello I am Backend")
});


export { app };