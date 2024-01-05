import asyncHandler from "express-async-handler";
import { userModel } from "../../models/user.model.js";
const allUsers = asyncHandler( async (req, res, next) => {
    const keywords = req.query.search ? {
        $or: [
            {
                name: { $regex: req.query.search, $options: 'i'}
            },
            {
                email: { $regex: req.query.search, $options: 'i'}
            },
        ]
    } : {}

    const users = await userModel.find(keywords).find({
        _id: {
            $ne: req._id
        }
    });
    res.send(users);
});


export { allUsers } ;
