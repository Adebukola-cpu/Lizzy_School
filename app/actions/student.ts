"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { dbConnect } from "../lib/dbconnect";
import UserModel from "../models/user";
import { redirect } from "next/navigation";
import { uploadImage } from "../utils/action";


export async function registerStudent(formData: FormData) {

    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Not authenticated");

    await dbConnect();

    const firstname = formData.get("firstname") as string;
    const middlename = formData.get("middlename") as string;
    const lastname = formData.get("lastname") as string;
    const age = formData.get("age") as string;
    const DOB = formData.get("DOB") as string;

    // ✅ Upload image properly
    // const imageUrl = await uploadImage(formData);
    const imageUrl = await uploadImage(formData).catch(() => "");

    await UserModel.findOneAndUpdate(
        { email: session.user.email },
        {
            firstname,
            middlename,
            lastname,
            age: Number(age),
            DOB: new Date(DOB),
            profileImage: imageUrl,
        }
    );

    redirect("/studentPortal");
}