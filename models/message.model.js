import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema( {
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatModel"
    }
}, { timestamps: true });

export const messageModel = mongoose.model("messageModel", messageSchema);