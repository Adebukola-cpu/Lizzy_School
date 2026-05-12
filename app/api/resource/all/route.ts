// import { dbConnect } from "@/app/lib/dbconnect";
// import resource from "@/app/models/resource";
// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";
// import { authOptions } from "../../auth/[...nextauth]/route";

// export async function GET() {

//     try {

//         // CONNECT DB
//         await dbConnect();

//         // CHECK SESSION
//         const session = await getServerSession(authOptions);

//         // BLOCK UNAUTHORIZED USERS
//         if (!session) {

//             return NextResponse.json(
//                 {
//                     success: false,
//                     message: "Unauthorized",
//                 },
//                 {
//                     status: 401,
//                 }
//             );

//         }

//         // FETCH RESOURCES
//         const resources = await resource.find().sort({
//             createdAt: -1,
//         });

//         // RETURN DATA
//         return NextResponse.json({
//             success: true,
//             resources,
//         });

//     } catch (err) {

//         console.log(err);

//         return NextResponse.json(
//             {
//                 success: false,
//                 message: "Server Error",
//             },
//             {
//                 status: 500,
//             }
//         );

//     }

// }



import { dbConnect } from "@/app/lib/dbconnect";
import resource from "@/app/models/resource";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

import { NextResponse } from "next/server";

export async function GET() {

    try {

        await dbConnect();

        const session = await getServerSession(authOptions);

        // BLOCK UNAUTHORIZED USERS
        if (!session) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );

        }

        const resources = await resource.find().sort({
            createdAt: -1,
        });

        return NextResponse.json({
            success: true,
            resources,
        });

    } catch (err) {

        console.log(err);

        return NextResponse.json(
            {
                success: false,
                message: "Server Error",
            },
            {
                status: 500,
            }
        );

    }

}