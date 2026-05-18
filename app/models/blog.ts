import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: String,

        slug: {
            type: String,
            unique: true,
        },

        excerpt: String,

        content: String,

        image: String,

        category: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const BlogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default BlogModel;