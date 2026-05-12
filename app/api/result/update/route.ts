import { dbConnect } from "@/app/lib/dbconnect";
import result from "@/app/models/result";

export async function POST(req: Request) {
    await dbConnect();

    const { id, subject, score, term, session, className } = await req.json();

    const updated = await result.findByIdAndUpdate(
        id,
        {
            subject,
            score: Number(score),
            term,
            session,
            className,
        },
        { new: true }
    );

    return Response.json({ updated });
}
