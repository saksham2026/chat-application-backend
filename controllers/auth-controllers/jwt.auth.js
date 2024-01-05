import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import { ApiError } from '../../Utils/ApiError.js';
import { userModel } from '../../models/user.model.js';
const cookiOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
};

const jwtAuth = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ","");

    // Checking if the User has accessToken.
    if (!accessToken) throw new ApiError(405, "User needs to login again");

    // Checking if the User has a valid accessToken.

    let payload;
    try {
        payload = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);

    } catch (error) {
        // If there is error, this means token is not verified.
        throw new ApiError(405, "User needs to login again");
    }

    // If the accessToken is verified, we will check if the token is of a valid user .

    const userId = payload._id;
    const ifUserExist = await userModel.findById(userId);

    // If no user exits, we will guide the user to login again.
    if(ifUserExist == undefined ) throw new ApiError(405, "User needs to login again");

    // If the user exits, we will renew his/her accessTOken

    const accesstoken  = await ifUserExist.generateAccessToken();
    req._id = ifUserExist._id;

    next();

});

export { jwtAuth }; 