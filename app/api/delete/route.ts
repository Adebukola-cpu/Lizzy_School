import { dbConnect } from "@/app/lib/dbconnect";
import UserModel from "@/app/models/user";

export async function POST(req: Request) {
    await dbConnect();

    const { id } = await req.json();

    await UserModel.findByIdAndDelete(id);

    return Response.json({ message: "Student deleted" });
}

