"use server";

import cloudinary from "../lib/cloudinary";



export async function uploadImage(formData: FormData) {
    const file = formData.get("image") as File;

    if (!file || file.size === 0) {
        throw new Error("No file uploaded");
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
        folder: "students",
    });

    return result.secure_url;
}

