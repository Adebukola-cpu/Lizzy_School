import { getServerSession } from "next-auth";
import { dbConnect } from "@/app/lib/dbconnect";
import UserModel from "@/app/models/user";

export async function PUT(req: Request) {
    const session = await getServerSession();

    if (!session) {
        return new Response("Unauthorized", { status: 403 });
    }

    const body = await req.json();

    await dbConnect();

    const updated = await UserModel.findByIdAndUpdate(
        session.user.id, // 🔥 ONLY their own ID
        body,
        { new: true }
    );

    return Response.json(updated);
}