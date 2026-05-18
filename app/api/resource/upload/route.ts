import { NextRequest, NextResponse } from "next/server";

import cloudinary from "@/app/lib/cloudinary";

import { dbConnect } from "@/app/lib/dbconnect";

import ResourceModel from "@/app/models/resource";

export async function POST(req: NextRequest) {

    try {

        await dbConnect();

        const formData = await req.formData();

        const file = formData.get("file") as File;

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const category = formData.get("category") as string;
        const className = formData.get("className") as string;

        if (!file) {

            return NextResponse.json(
                {
                    success: false,
                    message: "No file uploaded",
                },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const uploadResult: any = await new Promise(
            (resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "school_resources",
                        resource_type: "video",
                    },

                    (error, result) => {

                        if (error) reject(error);
                        else resolve(result);
                    }
                );

                stream.end(buffer);
            }
        );

        const resource = await ResourceModel.create({
            title,
            description,
            category,
            className,

            resourceType: "video",

            fileUrl: uploadResult.secure_url,
        });

        return NextResponse.json({
            success: true,
            resource,
        });

    } catch (error: any) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}