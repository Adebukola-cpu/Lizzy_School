import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        category: String,
        type: String, // PDF | LINK | ZIP
        className: String,
        fileUrl: String,
    },
    { timestamps: true }
);

export default mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);