import { dbConnect } from "@/app/lib/dbconnect";
import result from "@/app/models/result";

export async function POST(req: Request) {
    try {
        await dbConnect(); // ✅ VERY IMPORTANT

        const body = await req.json();

        const { studentId, subject, score, term, session, className } = body;

        if (!studentId || !subject) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const newResult = await result.create({
            student: studentId,
            subject,
            score: Number(score),
            term,
            session,
            className,
        });

        return Response.json({ result: newResult });

    } catch (err: any) {

        // 👇 duplicate key error
        if (err.code === 11000) {
            return Response.json(
                { error: "Result already exists for this subject/term/session" },
                { status: 409 }
            );
        }

        console.error("CREATE RESULT ERROR:", err);

        return Response.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}