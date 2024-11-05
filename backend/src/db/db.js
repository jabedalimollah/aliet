import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

// ------------- Database Connection ----------
const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection faild !!!: ", err);
  }
};

export default connectDB;
