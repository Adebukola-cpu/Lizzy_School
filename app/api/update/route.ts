import { dbConnect } from "@/app/lib/dbconnect";
import UserModel from "@/app/models/user";

export async function POST(req: Request) {
    await dbConnect();

    const { id, firstname, lastname } = await req.json();

    await UserModel.findByIdAndUpdate(id, {
        firstname,
        lastname,
    });

    return Response.json({ message: "Updated" });
}