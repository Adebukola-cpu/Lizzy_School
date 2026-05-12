import { dbConnect } from "@/app/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import result from "@/app/models/result";

export async function GET() {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const results = await result.find({
        student: session.user.id,
    });

    return Response.json({ results });
}