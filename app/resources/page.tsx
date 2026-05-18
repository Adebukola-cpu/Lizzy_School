"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link"
import LogoutButton from "../components/logoutButton";


type Resource = {
    _id: string;
    title: string;
    description: string;
    category: string;
    resourceType: string;
    className?: string;
    fileUrl: string;
};

export default function ResourcesPage() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    

    // FETCH RESOURCES
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await fetch("/api/resource/all");

                const data = await res.json();

                if (data.success) {
                    setResources(data.resources);
                
                }
                
            } catch (err) {
                console.error("Failed to fetch resources", err);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    // DYNAMIC CATEGORIES
    const categories = [
        "All",
        ...new Set(resources.map((r) => r.category)),
    ];

    // FILTER
    const filtered = resources.filter((item) => {
        const matchCategory =
            activeFilter === "All" ||
            item.category === activeFilter;

        const matchSearch =
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description
                .toLowerCase()
                .includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="p-4">
                <Link
                    href="/"
                    className="bg-black text-white px-4 py-2 rounded-lg inline-block"
                >
                    ← Back Home
                </Link>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Resources</h1>
                <LogoutButton />
            </div>

            {/* HERO */}
            <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-20 px-4 sm:px-6 text-center">

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4"
                >
                    School Resources Hub
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto text-sm sm:text-lg text-blue-100"
                >
                    Access learning materials, downloads,
                    guides, tutorials, and academic resources.
                </motion.p>

            </section>

            {/* SEARCH + FILTER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

                {/* SEARCH */}
                <div className="bg-white p-4 rounded-2xl shadow mb-8">

                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* FILTERS */}
                <div className="flex flex-wrap gap-3 mb-10">

                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === cat
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "bg-white border hover:bg-gray-100"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}

                </div>

                {/* LOADING */}
                {loading && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            Loading resources...
                        </p>
                    </div>
                )}

                {/* GRID */}
                {!loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

                        {filtered.map((item, index) => (

                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05,
                                }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col"
                            >

                                {/* TOP */}
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">

                                    <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-4">
                                        {item.type}
                                    </span>

                                    <h3 className="text-xl font-bold line-clamp-2">
                                        {item.title}
                                    </h3>

                                </div>

                                {/* BODY */}
                                <div className="p-6 flex flex-col grow">

                                    <p className="text-gray-600 text-sm leading-relaxed grow">
                                        {item.description}
                                    </p>

                                    {/* CLASS */}
                                    {item.className && (
                                        <div className="mt-4">
                                            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                                {item.className}
                                            </span>
                                        </div>
                                    )}

                                    {/* BUTTONS */}
                                    <div className="flex gap-3 mt-6">

                                        {item.resourceType === "video" ? (

                                            <video
                                                controls
                                                className="w-full rounded-xl"
                                            >
                                                <source
                                                    src={item.fileUrl}
                                                    type="video/mp4"
                                                />
                                            </video>

                                        ) : (

                                            <a
                                                href={item.fileUrl}
                                                target="_blank"
                                                className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-center hover:bg-blue-700 transition font-medium"
                                            >
                                                Open
                                            </a>

                                        )}

                                    </div>

                                </div>

                            </motion.div>

                        ))}

                    </div>
                )}

                {/* EMPTY */}
                {!loading && filtered.length === 0 && (
                    <div className="text-center py-20">

                        <h3 className="text-2xl font-bold text-gray-700 mb-3">
                            No Resources Found
                        </h3>

                        <p className="text-gray-500">
                            Try another search or category.
                        </p>

                    </div>
                )}

            </section>

            {/* CTA */}
            <section className="bg-white py-20 px-4 sm:px-6 text-center border-t">

                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Need More Materials?
                </h2>

                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Contact your teachers or administrators for
                    additional educational materials and support.
                </p>

                <Link href="/contact">

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl transition font-semibold shadow-lg hover:shadow-xl">
                        Contact Support
                    </button>

                </Link>

            </section>

        </main>
    );
}