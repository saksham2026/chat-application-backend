import { ApiError } from "../../Utils/ApiError.js";
import { ApiResponse } from "../../Utils/ApiResponse.js";
import { chatModel } from "../../models/chat.model.js";
import asyncHandler from "express-async-handler";
import { userModel } from "../../models/user.model.js";
const accessChat = asyncHandler(async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) throw new ApiError(500, "UserId not recieved");

    let isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
            {
                users: { $elemMatch: { $eq: req._id } }
            },
            {
                users: { $elemMatch: { $eq: userId } }
            }
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await userModel.populate(isChat, {
        path: "latestMessage sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req._id, userId]
        };

        const createdChat = await chatModel.create(chatData);
        const FullChat = await chatModel.findOne(createdChat._id);

        res
            .status(200)
            .json(new ApiResponse(200, FullChat, "Chat Fetched Successfully"))
    }


});

const fetchChats = asyncHandler(async (req, res, next) => {
    let chats;
    try {
        chats = await chatModel.find({
            users: {
                $elemMatch: {
                    $eq: req._id
                }
            }
        }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({
            updatedAt: -1
        }).then(async (results) => {
            results = await userModel.populate(results, {
                path: "latestMessage sender",
                select: "name pic email"
            });
            res.status(200).json(new ApiResponse(200, results, "Fetched chats successfully"));
        });



    } catch (error) {
        throw new ApiError(400, error.message)
    }



    res.send(chats);
});

const createGroupChat = asyncHandler(async (req, res, next) => {
    if( !req.body.users || !req.body.name ) throw new ApiError(400, "All information required");

    let users = req.body.users;

    users.push(req._id);

    if(users.length < 2) throw new ApiError("Need 1 more participant for group chat");

    try {
        const groupChat = await chatModel.create({
            chatName: req.body.name,
            users,
            isGroupChat: true,
            groupAdmin: req._id,
        });

        const fullGroupChat = await chatModel.findById(groupChat._id).populate("users", "-password")
        .populate("groupAdmin", "-password")

        res.status(200).json( new ApiResponse(200, fullGroupChat, "Group Created Successfully"));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
});

const renameGroup = asyncHandler( async (req, res, next) => {
    const { groupId, newName } = req.body;
    if( !groupId || !newName ) throw new ApiError(400, "All info not recieved");

    const updatedGroup = await chatModel.findByIdAndUpdate(groupId, {
        chatName: newName
    },
    {
        new: true
    });

    res.status(200).json( new ApiResponse(200, updatedGroup, "group updated successfully"));
});

const addToGroup = asyncHandler( async (req, res, next) => {
    const { chatId, userId } = req.body;

    if(!chatId || !userId) throw new ApiError(400, "Require all fields ie. chatId and userId");

    const chatUsers = await chatModel.findById(chatId).select("users");
    if(!chatUsers) throw new ApiError("Chat does not exists");

    const user = await userModel.findById(userId);
    if(!user) throw new ApiError(400, "User does not exists.");
    console.log(chatUsers.users);
    chatUsers.users.push(userId);
    console.log(chatUsers.users);
    const updatedChat = await chatModel.findByIdAndUpdate(chatId,{
        users: chatUsers.users
    },
    {
        new: true,
    });
    
    res.status(200).json(new ApiResponse(200, updatedChat, "User added successfully"))
});

const removeFromGroup = asyncHandler( async (req, res, next) => {
    const { userId, chatId } = req.body;

    const chat = await chatModel.findById(chatId).select("users");
    if(!chat) throw new ApiError(400, "Chat not found");

    const user = await userModel.findById(userId);
    if(!user) throw new ApiError(400, "User does not exists");

    if( !(chat.users.includes(userId)) ) throw new ApiError(400, "User not found in the group");

    const updatedChat = await chatModel.findByIdAndUpdate(chatId, {
            $pull: {
                users: {
                    $in: [
                        userId
                    ]
                }
            }
    },
    {
        new: true,
    });

    res.status(200).json( new ApiResponse(200, updatedChat, "Chat updated successfully"));
});



export { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup }