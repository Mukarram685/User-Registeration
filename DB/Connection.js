import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const MONGODB_URI = "mongodb+srv://Mukarram:muka6852@cluster0.8hyvd.mongodb.net"


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
console.log(`\n MongooDB connected !! DB host : ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MongooDb connection error", error);

        process.exit(1);
    }
}

export default connectDB;