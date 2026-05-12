import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminClient from "./adminClient";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { dbConnect } from "../lib/dbconnect";
import UserModel from "../models/user";


export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        redirect("/login");
    }

    await dbConnect();

    const students = await UserModel.find({ role: "student" }).lean();

    return <AdminClient students={JSON.parse(JSON.stringify(students))} />;
}