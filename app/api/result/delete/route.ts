import { dbConnect } from "@/app/lib/dbconnect";
import result from "@/app/models/result";


export async function POST(req: Request) {
    await dbConnect();

    const { id } = await req.json();

    await result.findByIdAndDelete(id);

    return Response.json({ message: "Deleted" });
}