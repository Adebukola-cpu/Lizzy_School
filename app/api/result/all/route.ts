import { dbConnect } from "@/app/lib/dbconnect";
import result from "@/app/models/result";

// export async function GET() {
//     await dbConnect();

//     const results = await result.find().lean();

//     console.log("FETCHING FOR STUDENT:", id);
//     console.log(results);

//     return Response.json({ results });
// }

export async function GET() {
    try {
        await dbConnect();

        const results = await result.find().lean();

        return Response.json({ results });
    } catch (err) {
        console.error("FETCH ALL ERROR:", err);

        return Response.json(
            { results: [] },
            { status: 500 }
        );
    }
}