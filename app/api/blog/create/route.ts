import { dbConnect } from "@/app/lib/dbconnect";
import BlogModel from "@/app/models/blog";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
    try {
        await dbConnect();

        // 🔐 AUTH CHECK
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token || token.role !== "admin") {
            return Response.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        const slug = body.title
            .toLowerCase()
            .replace(/\s+/g, "-");

        const blog = await BlogModel.create({
            ...body,
            slug,
        });

        return Response.json({
            success: true,
            blog,
        });

    } catch (error) {
        console.log(error);

        return Response.json(
            {
                success: false,
                message: "Server error",
            },
            {
                status: 500,
            }
        );
    }
}