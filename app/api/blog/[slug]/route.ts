import { dbConnect } from "@/app/lib/dbconnect";
import BlogModel from "@/app/models/blog";

export async function GET(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    await dbConnect();

    const params = await context.params;

    const blog = await BlogModel.findOne({
        slug: params.slug,
    });

    return Response.json({
        success: true,
        blog,
    });
}