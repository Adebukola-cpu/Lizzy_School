import { dbConnect } from "@/app/lib/dbconnect";
import BlogModel from "@/app/models/blog";

export async function GET() {
    try {
        await dbConnect();

        const blogs = await BlogModel.find().sort({
            createdAt: -1,
        });

        return Response.json({
            success: true,
            blogs,
        });
    } catch (error) {
        return Response.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}