import { userModel } from "../../models/user.model.js";
import asyncHandler from "express-async-handler";
import { ApiError } from "../../Utils/ApiError.js";;
import fs from "fs";
import { ApiResponse } from "../../Utils/ApiResponse.js";
const signup = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const { name, email, password, confirmPassword, pic } = req.body;

    if (!name || !email || !password || !confirmPassword) throw new ApiError(400, "All fields are required");

    if (password !== confirmPassword) throw new ApiError(401, "Password and Confirm Password must be same.");

    const isUserExist = await userModel.find({ email }) ;
    console.log("is", isUserExist);
    console.log("type", typeof(isUserExist));
    if(isUserExist.length != 0) throw new ApiError(402, "User already exists.");
    let newUser;
    try {
        newUser = await userModel.create({
            name,
            email,
            password,
            pic
        });
    } catch (error) {
        console.log("User can not be created");

        throw new ApiError(502, error);
    }
    res.status(200).json( new ApiResponse(200, newUser, "User is registered successfully"));
});

export { signup };
