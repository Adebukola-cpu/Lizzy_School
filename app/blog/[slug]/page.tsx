import Image from "next/image";
import { dbConnect } from "@/app/lib/dbconnect";
import BlogModel from "@/app/models/blog";
import { notFound } from "next/navigation";

export default async function BlogPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {

    await dbConnect();

    const { slug } = await params;

    const blog = await BlogModel.findOne({ slug });

    if (!blog) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-lg">

                <div className="relative w-full h-[400px]">

                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />

                </div>

                <div className="p-8">

                    <h1 className="text-4xl font-bold mb-6">
                        {blog.title}
                    </h1>

                    <p className="text-lg text-gray-700 whitespace-pre-line leading-relaxed">
                        {blog.content}
                    </p>

                </div>

            </div>

        </main>
    );
}