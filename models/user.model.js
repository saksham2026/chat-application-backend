import mongoose, { Schema } from "mongoose";

const  userSchema = new Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dl9f2vrhu/image/upload/v1703436685/k8862xu21guu8p9ga6mb.png"
    }
}, { timestamps: true });

export const userModel = mongoose.model("userModel", userSchema); 