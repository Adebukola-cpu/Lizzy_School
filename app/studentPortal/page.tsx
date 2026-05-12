import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { dbConnect } from "@/app/lib/dbconnect";
import UserModel from "@/app/models/user";
import StudentClient from "./studentclient";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function StudentPage() {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/login");

    await dbConnect();

    const student = await UserModel.findById(session.user.id).lean();
    
    if (!student) redirect("/login"); // extra safety

    return <StudentClient student={JSON.parse(JSON.stringify(student))} />;
}