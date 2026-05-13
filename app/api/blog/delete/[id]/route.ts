// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { dbConnect } from "@/app/lib/dbconnect";
// import BlogModel from "@/app/models/blog";
// import { getServerSession } from "next-auth";


// export async function DELETE(
//     req: Request,
//     { params }: { params: Promise<{ id: string }> }
// ) {

//     try {

//         const session = await getServerSession(authOptions);

//         if (!session || session.user.role !== "admin") {

//             return Response.json(
//                 { success: false },
//                 { status: 401 }
//             );
//         }

//         await dbConnect();

//         await BlogModel.findByIdAndDelete(params.id);

//         return Response.json({
//             success: true,
//         });

//     } catch (error) {

//         return Response.json(
//             { success: false },
//             { status: 500 }
//         );
//     }
// }

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/app/lib/dbconnect";
import BlogModel from "@/app/models/blog";
import { getServerSession } from "next-auth";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        // Protect route
        if (!session || session.user.role !== "admin") {
            return Response.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await dbConnect();

        // ✅ Await params first
        const { id } = await params;

        await BlogModel.findByIdAndDelete(id);

        return Response.json({
            success: true,
        });

    } catch (error) {
        console.log(error);

        return Response.json(
            { success: false },
            { status: 500 }
        );
    }
}