import { dbConnect } from "@/app/lib/dbconnect";
import result from "@/app/models/result";


// export async function GET(req: Request) {
//     await dbConnect();

//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     const results = await result.find({ student: id }).lean(); // ✅ correct field
//     // const results = await result.find().populate("student").lean();

//     return Response.json({ results });
// }

export async function GET(req: Request) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return Response.json({ results: [] });
    }

    const results = await result.find({ student: id }).lean(); // ✅ FILTERED

    return Response.json({ results });
}