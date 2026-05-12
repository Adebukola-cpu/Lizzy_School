import mongoose from "mongoose";

export const dbConnect = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;

    const connection = await mongoose.connect(MONGODB_URI!)


}