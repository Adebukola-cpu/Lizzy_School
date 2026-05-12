"use client";

import { useState } from "react";
import Image from "next/image";

export default function BlogAdminPage() {

    const [loading, setLoading] = useState(false);

    const [preview, setPreview] = useState("");

    const [imageFile, setImageFile] = useState<File | null>(null);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: "",
        category: "",
    });


    // ================= IMAGE CHANGE =================

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);

        setPreview(URL.createObjectURL(file));
    };

    // ================= SUBMIT =================

    const handleSubmit = async () => {

        try {

            setLoading(true);

            let imagePath = "";

            // ================= UPLOAD IMAGE =================

            if (imageFile) {

                const formData = new FormData();

                formData.append("file", imageFile);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const uploadData = await uploadRes.json();

                imagePath = uploadData.filePath;
            }

            // ================= CREATE BLOG =================

            const res = await fetch("/api/blog/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    image: imagePath,
                }),
            });

            const data = await res.json();

            if (data.success) {

                alert("Blog uploaded successfully");

                setForm({
                    title: "",
                    slug: "",
                    excerpt: "",
                    content: "",
                    image: "",
                    category: "",
                });

                setPreview("");

                setImageFile(null);
            }

        } catch (error) {

            console.error(error);

            alert("Upload failed");

        } finally {

            setLoading(false);
        }
    };

    return (

        <main className="max-w-3xl mx-auto p-6">

            <div className="bg-white shadow-xl rounded-2xl p-8">

                <h1 className="text-3xl font-bold mb-8 text-center">
                    Upload Blog
                </h1>

                <div className="space-y-5">

                    {/* TITLE */}

                    <input
                        placeholder="Title"
                        className="w-full border p-4 rounded-xl"
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value,
                            })
                        }
                    />

                    {/* SLUG */}

                    <input
                        placeholder="Slug (example: admission-open)"
                        className="w-full border p-4 rounded-xl"
                        value={form.slug}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                slug: e.target.value,
                            })
                        }
                    />

                    {/* CATEGORY */}

                    <input
                        placeholder="Category"
                        className="w-full border p-4 rounded-xl"
                        value={form.category}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                category: e.target.value,
                            })
                        }
                    />

                    {/* IMAGE */}

                    <div className="border-2 border-dashed rounded-2xl p-6">

                        <p className="font-semibold mb-4">
                            Upload Blog Image
                        </p>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        {preview && (

                            <div className="mt-6">

                                <Image
                                    src={preview}
                                    alt="Preview"
                                    width={800}
                                    height={400}
                                    className="rounded-xl object-cover w-full h-64"
                                />

                            </div>
                        )}

                    </div>

                    {/* EXCERPT */}

                    <textarea
                        placeholder="Excerpt"
                        className="w-full border p-4 rounded-xl h-28"
                        value={form.excerpt}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                excerpt: e.target.value,
                            })
                        }
                    />

                    {/* CONTENT */}

                    <textarea
                        placeholder="Content"
                        className="w-full border p-4 rounded-xl h-72"
                        value={form.content}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                content: e.target.value,
                            })
                        }
                    />

                    {/* BUTTON */}

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
                    >
                        {loading ? "Uploading..." : "Upload Blog"}
                    </button>

                </div>

            </div>

        </main>
    );
}