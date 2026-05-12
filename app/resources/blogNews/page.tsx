"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch("/api/blog/all");
            const data = await res.json();

            setBlogs(data.blogs || []);
        };

        fetchBlogs();
    }, []);

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-5xl font-bold mb-12 text-center">
                School Blog
            </h1>

            <div className="grid md:grid-cols-3 gap-8">
                {blogs.map((blog: any) => (
                    <Link
                        key={blog._id}
                        href={`/blog/${blog.slug}`}
                    >
                        <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                width={500}
                                height={300}
                                className="w-full h-60 object-cover"
                            />

                            <div className="p-5">
                                <h2 className="font-bold text-xl mb-3">
                                    {blog.title}
                                </h2>

                                <p className="text-gray-600">
                                    {blog.excerpt}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}