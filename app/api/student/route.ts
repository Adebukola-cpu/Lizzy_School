

import { dbConnect } from "@/app/lib/dbconnect";
import UserModel from "@/app/models/user";

export async function GET() {
    await dbConnect();

    const students = await UserModel.find({ role: "student" });

    return Response.json({ students });
}