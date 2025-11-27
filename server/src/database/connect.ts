import mongoose from "mongoose";
import { configService } from "src/config";

export const connectToMongoDatabase = async () => {
    const { MONGODB_URL } = configService;
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
