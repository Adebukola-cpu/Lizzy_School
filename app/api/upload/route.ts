import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {

    try {

        const data = await req.formData();

        const file: File | null = data.get("file") as unknown as File;

        if (!file) {

            return Response.json(
                {
                    success: false,
                },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        // UNIQUE FILE NAME

        const fileName = `${Date.now()}-${file.name}`;

        const uploadPath = path.join(
            process.cwd(),
            "public/uploads",
            fileName
        );

        // SAVE FILE

        await writeFile(uploadPath, buffer);

        return Response.json({
            success: true,
            filePath: `/uploads/${fileName}`,
        });

    } catch (error) {

        console.error(error);

        return Response.json(
            {
                success: false,
            },
            { status: 500 }
        );
    }
}