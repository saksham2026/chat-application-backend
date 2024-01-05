import mongoose from "mongoose";

const dbConnect = async (MONGO_URI, DB_NAME) => {

    try {
        const connectionInstance = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`, {
            useNewUrlParser: true,
        });
        console.log("Connection to database successfull !!", connectionInstance.connection.host);
    } catch (error) {
        console.log("Failed to connect to the database !! :-(", error);
    }
};


export default dbConnect;

