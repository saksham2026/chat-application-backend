import mongoose, { Schema, mongo } from "mongoose";


const chatSchema = new Schema({
    chatName: {
        type: String,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "messageModel",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    }
}, { timestamps: true});


export const chatModel = mongoose.model("chatModel", chatSchema);