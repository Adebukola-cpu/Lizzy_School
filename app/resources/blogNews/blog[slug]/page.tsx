import { dbConnect } from "@/app/lib/dbconnect";
import BlogModel from "@/app/models/blog";
import Image from "next/image";

export default async function BlogDetails({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    await dbConnect();

    const { slug } = await params;

    const blog = await BlogModel.findOne({
        slug,
    });

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <main className="max-w-4xl mx-auto px-6 py-16">
            <Image
                src={blog.image}
                alt={blog.title}
                width={1200}
                height={600}
                className="w-full h-[400px] object-cover rounded-2xl mb-8"
            />

            <h1 className="text-4xl font-bold mb-4">
                {blog.title}
            </h1>

            <p className="text-gray-500 mb-10">
                {blog.category}
            </p>

            <div className="text-lg leading-8 whitespace-pre-line">
                {blog.content}
            </div>
        </main>
    );
}