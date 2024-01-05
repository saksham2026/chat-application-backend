import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
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
        default: "https://res.cloudinary.com/dl9f2vrhu/image/upload/v1703436685/k8862xu21guu8p9ga6mb.png"
    },
}, { timestamps: true });

userSchema.pre('save', async function(next){
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.method({
    isPasswordCorrect: async function(password){
      return (await bcrypt.compare(password, this.password));
    },
    generateAccessToken: async function(){
      return jwt.sign({
        _id: this._id,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
      )
    },
  });


export const userModel = mongoose.model("userModel", userSchema); 