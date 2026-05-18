"use client";

import { useState } from "react";

export default function UploadResourcePage() {

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const handleUpload = async (e: any) => {

        e.preventDefault();

        setLoading(true);

        setMessage("");

        const formData = new FormData();

        formData.append("title", e.target.title.value);

        formData.append(
            "description",
            e.target.description.value
        );

        formData.append(
            "category",
            e.target.category.value
        );

        formData.append(
            "className",
            e.target.className.value
        );

        formData.append(
            "file",
            e.target.file.files[0]
        );

        try {

            const res = await fetch(
                "/api/resource/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (data.success) {

                setMessage(
                    "Video uploaded successfully"
                );

                e.target.reset();

            } else {

                setMessage(
                    data.message || "Upload failed"
                );
            }

        } catch (error) {

            console.log(error);

            setMessage("Something went wrong");
        }

        setLoading(false);
    };

    return (

        <main className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">

                <h1 className="text-3xl font-bold mb-6">
                    Upload Resource Video
                </h1>

                <form
                    onSubmit={handleUpload}
                    className="space-y-4"
                >

                    <input
                        name="title"
                        placeholder="Title"
                        required
                        className="border p-3 w-full rounded-lg"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        required
                        className="border p-3 w-full rounded-lg"
                    />

                    <input
                        name="category"
                        placeholder="Category"
                        required
                        className="border p-3 w-full rounded-lg"
                    />

                    <input
                        name="className"
                        placeholder="Class"
                        required
                        className="border p-3 w-full rounded-lg"
                    />

                    <input
                        type="file"
                        name="file"
                        accept="video/*"
                        required
                        className="border p-3 w-full rounded-lg"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
                    >
                        {loading
                            ? "Uploading..."
                            : "Upload Video"}
                    </button>

                    {message && (

                        <p className="text-sm text-gray-600">

                            {message}

                        </p>
                    )}

                </form>

            </div>

        </main>
    );
}