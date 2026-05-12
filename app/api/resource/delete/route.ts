import { dbConnect } from "@/app/lib/dbconnect";
import resource from "@/app/models/resource";

export async function POST(req: Request) {

    try {

        await dbConnect();

        const { id } = await req.json();

        await resource.findByIdAndDelete(id);

        return Response.json({
            success: true,
        });

    } catch (error) {

        return Response.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );

    }

}