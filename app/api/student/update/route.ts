// import { dbConnect } from "@/app/lib/dbconnect";
// import UserModel from "@/app/models/user";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function POST(req: Request) {
//     await dbConnect();

//     const session = await getServerSession(authOptions);

//     if (!session) {
//         return Response.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { firstname, middlename, lastname } = await req.json();

//     const updated = await UserModel.findByIdAndUpdate(
//         session.user.id,
//         { firstname, middlename, lastname },
//         { new: true }
//     );

//     return Response.json({ updated });
// }

import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbconnect";
import UserModel from "@/app/models/user";
import cloudinary from "@/app/lib/cloudinary";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const formData = await req.formData();

        const id = formData.get("id") as string;

        const firstname = formData.get("firstname") as string;
        const middlename = formData.get("middlename") as string;
        const lastname = formData.get("lastname") as string;

        const image = formData.get("profileImage") as File | null;

        let imageUrl;

        // UPLOAD IMAGE
        if (image && image.size > 0) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const base64 = `data:${image.type};base64,${buffer.toString("base64")}`;

            const uploaded = await cloudinary.uploader.upload(base64, {
                folder: "students",
            });

            imageUrl = uploaded.secure_url;
        }

        // UPDATE USER
        const updatedStudent = await UserModel.findByIdAndUpdate(
            id,
            {
                firstname,
                middlename,
                lastname,
                ...(imageUrl && { profileImage: imageUrl }),
            },
            {
                returnDocument: "after"
            }
        );

        return NextResponse.json({
            success: true,
            student: updatedStudent,
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Update failed",
            },
            { status: 500 }
        );
    }
}