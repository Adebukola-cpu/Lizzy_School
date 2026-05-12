import { dbConnect } from "@/app/lib/dbconnect";
import UserModel from "@/app/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { firstname, middlename, lastname } = await req.json();

    const updated = await UserModel.findByIdAndUpdate(
        session.user.id,
        { firstname, middlename, lastname },
        { new: true }
    );

    return Response.json({ updated });
}