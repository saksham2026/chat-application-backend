import express from "express";
import { jwtAuth } from "../controllers/auth-controllers/jwt.auth.js";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from "../controllers/chatControllers/Chats.controller.js";

const Router = express.Router();

Router.route("/").post(jwtAuth, accessChat);  
Router.route("/").get(jwtAuth, fetchChats);

Router.route("/group").post(jwtAuth, createGroupChat);
Router.route("/rename").put(jwtAuth, renameGroup);
Router.route("/groupadd").put(jwtAuth, addToGroup);
Router.route("/groupremove").put(jwtAuth, removeFromGroup);

export default Router;