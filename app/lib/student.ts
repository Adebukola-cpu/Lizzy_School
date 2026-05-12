// import cloudinary from "@/app/lib/cloudinary";
// import { dbConnect } from "@/app/lib/dbconnect";
// import UserModel from "@/app/models/user";

// export async function createStudent(formData: FormData) {
//     try {
//         await dbConnect();

//         const firstname = formData.get("firstname") as string;
//         const middlename = formData.get("middlename") as string;
//         const lastname = formData.get("lastname") as string;
//         const age = formData.get("age") as string;
//         const DOB = formData.get("DOB") as string;
//         const email = formData.get("email") as string;

//         const file = formData.get("image") as File;

//         let imageUrl = "";

//         // ✅ Upload image
//         if (file && file.size > 0) {
//             const bytes = await file.arrayBuffer();
//             const buffer = Buffer.from(bytes);

//             const base64 = buffer.toString("base64");
//             const dataURI = `data:${file.type};base64,${base64}`;

//             const upload = await cloudinary.uploader.upload(dataURI, {
//                 folder: "students",
//             });

//             imageUrl = upload.secure_url;
//         }

//         // ✅ Create user
//         const user = await UserModel.create({
//             firstname,
//             middlename,
//             lastname,
//             age: Number(age),
//             DOB: new Date(DOB),
//             email,
//             profileImage: imageUrl,
//         });

//         // ✅ RETURN RAW DATA (VERY IMPORTANT)
//         return user;

//     } catch (error: any) {
//         console.error("LIB ERROR:", error);
//         throw new Error("Failed to create student");
//     }
// }