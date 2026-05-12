import { NextResponse } from "next/server";

import { dbConnect } from "@/app/lib/dbconnect";
import resource from "@/app/models/resource";


export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();

        const Resource = await resource.create(body);

        return NextResponse.json({
            success: true,
            resource: Resource,
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: "Failed" },
            { status: 500 }
        );
    }
}