import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        category: String,
        resourceType: {
            type: String,
            enum: ["video", "pdf", "image"],
            default: "video",
        },
        className: String,
        fileUrl: String,
    },
    { timestamps: true }
);

export default mongoose.models.Resource || mongoose.model("Resource", ResourceSchema);