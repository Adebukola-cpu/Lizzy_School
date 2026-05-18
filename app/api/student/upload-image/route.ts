// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";

// import { authOptions } from "../../auth/[...nextauth]/route";

// import { dbConnect } from "@/app/lib/dbconnect";
// import UserModel from "@/app/models/user";

// import cloudinary from "@/app/lib/cloudinary";

// export async function POST(req: NextRequest) {
//     try {

//         await dbConnect();

//         // SESSION
//         const session = await getServerSession(authOptions);

//         if (!session?.user?.email) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: "Unauthorized",
//                 },
//                 { status: 401 }
//             );
//         }

//         // FORM DATA
//         const formData = await req.formData();

//         const file = formData.get("image") as File;

//         if (!file) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: "No image uploaded",
//                 },
//                 { status: 400 }
//             );
//         }

//         // VALIDATE IMAGE TYPE
//         if (!file.type.startsWith("image/")) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: "Only image files allowed",
//                 },
//                 { status: 400 }
//             );
//         }

//         // VALIDATE FILE SIZE (2MB)
//         if (file.size > 2 * 1024 * 1024) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: "Image must be less than 2MB",
//                 },
//                 { status: 400 }
//             );
//         }

//         // CONVERT TO BUFFER
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         // CLOUDINARY UPLOAD
//         const uploadResult: any = await new Promise(
//             (resolve, reject) => {

//                 const stream = cloudinary.uploader.upload_stream(
//                     {
//                         folder: "studentPortal",
//                     },

//                     (error, result) => {

//                         if (error) {
//                             reject(error);
//                         } else {
//                             resolve(result);
//                         }
//                     }
//                 );

//                 stream.end(buffer);
//             }
//         );

//         // UPDATE USER
//         const updatedUser = await UserModel.findOneAndUpdate(
//             {
//                 email: session.user.email,
//             },
//             {
//                 profileImage: uploadResult.secure_url,
//             },
//             {
//                 new: true,
//             }
//         );

//         return NextResponse.json({
//             success: true,
//             image: uploadResult.secure_url,
//             user: updatedUser,
//         });

//     } catch (error: any) {

//         console.error("UPLOAD ERROR:", error);

//         return NextResponse.json(
//             {
//                 success: false,
//                 message: error.message || "Upload failed",
//             },
//             {
//                 status: 500,
//             }
//         );
//     }
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

import { dbConnect } from "@/app/lib/dbconnect";
import UserModel from "@/app/models/user";

import cloudinary from "@/app/lib/cloudinary";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const formData = await req.formData();

        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }

        // convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // convert to base64
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

        // upload to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(base64, {
            folder: "studentPortal",
        });

        // update user
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: session.user.email },
            {
                profileImage: uploadResponse.secure_url,
            },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            imageUrl: uploadResponse.secure_url,
            user: updatedUser,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Upload failed",
            },
            { status: 500 }
        );
    }
}