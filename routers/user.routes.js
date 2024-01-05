import express from "express";

const Router = express.Router();
import upload from "../Utils/Multer.js";
import { signup } from "../controllers/auth-controllers/signup.controller.js";
import { login } from "../controllers/auth-controllers/login.controller.js";
import { allUsers } from "../controllers/usercontrollers/user.controller.js";
import { jwtAuth } from "../controllers/auth-controllers/jwt.auth.js";

Router.route('/signup').post(signup); 
Router.route('/').get(jwtAuth,allUsers);
Router.route('/login').post(login);

export default Router;