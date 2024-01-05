import {v2 as cloudinary } from "cloudinary";


const uploadOnCloudinary = async (localFilePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET, 
    });
    const response = await cloudinary.uploader.upload(localFilePath)
    return response;
};


export { uploadOnCloudinary };