import asyncHandler from "express-async-handler";
import { userModel } from "../../models/user.model.js";
import { ApiError } from "../../Utils/ApiError.js";
import { ApiResponse } from "../../Utils/ApiResponse.js";


const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
};

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Checking is all the fields are entered.
    if (!email || !password) throw new ApiError(400, "All fields are required.");

    // Finding the user in the database.
    const ifUserExits = await userModel.findOne({ email });

    // Checking if the User exists.
    if (ifUserExits == undefined) throw new ApiError(404, "User not found.");

    // Checking if the password is correct.
    console.log("correct",ifUserExits.isPasswordCorrect(password));
    const passwordisCorrect = await ifUserExits.isPasswordCorrect(password);
    if (!passwordisCorrect) throw new ApiError(405, "Credentials are wrong");

    // After all the checks we can provide accessToken to the User.

    const accessToken = await ifUserExits.generateAccessToken();
    res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .json(new ApiResponse(200, ifUserExits, "User logged in successfully"));

});

export { login };