"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import LogoutButton from "../components/logoutButton";

import { useIdleTimer } from "react-idle-timer";
import { signOut } from "next-auth/react";



type Student = {
    _id: string;
    firstname?: string;
    middlename?: string;
    lastname?: string;
    email?: string;
    profileImage?: string;
};

export default function AdminClient({ students }: { students: Student[] }) {

    const [search, setSearch] = useState("");
    const [studentsState, setStudentsState] = useState(students);

    const [resultsMap, setResultsMap] = useState<{ [key: string]: any[] }>({});

    // ✏️ Edit student
    const [editingStudent, setEditingStudent] = useState<any>(null);
    const [editForm, setEditForm] = useState({
        firstname: "",
        middlename: "",
        lastname: "",
    });

    // 📊 Result form
    const [resultStudent, setResultStudent] = useState<any>(null);
    const [editingResultId, setEditingResultId] = useState<string | null>(null);

    const [resultForm, setResultForm] = useState({
        subject: "",
        score: "",
        term: "",
        session: "",
        className: "",
    });

    const [resourceForm, setResourceForm] = useState({
        title: "",
        description: "",
        category: "",
        type: "",
        className: "",
        fileUrl: "",
    });

    const [resources, setResources] = useState<any[]>([]);
    const [blogs, setBlogs] = useState([]);

    // ================= FETCH RESULTS FOR ALL STUDENTS =================
    
    useEffect(() => {
        const fetchAllResults = async () => {
            try {
                const res = await fetch("/api/result/all");
                const data = await res.json();

                const grouped: { [key: string]: any[] } = {};

                for (const r of data.results) {
                    const studentId = r.student?.toString(); // ✅ important

                    if (!grouped[studentId]) {
                        grouped[studentId] = [];
                    }

                    grouped[studentId].push(r);
                }

                setResultsMap(grouped);

            } catch (err) {
                console.error("Failed to fetch results", err);
            }
        };

        fetchAllResults();
    }, []);

    //still testing
    useEffect(() => {

        const fetchResources = async () => {

            const res = await fetch("/api/resource/all");

            const data = await res.json();

            if (data.success) {
                setResources(data.resources);
            }

        };

        fetchResources();

    }, []);


    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        const res = await fetch("/api/blog/all");
        const data = await res.json();

        setBlogs(data.blogs);
    };


    // ================= SEARCH =================
    const filtered = studentsState.filter((s) => {
        const firstname = s.firstname ?? "";
        const lastname = s.lastname ?? "";
        const email = s.email ?? "";

        return (
            firstname.toLowerCase().includes(search.toLowerCase()) ||
            lastname.toLowerCase().includes(search.toLowerCase()) ||
            email.toLowerCase().includes(search.toLowerCase())
        );
    });

    useIdleTimer({
        timeout: 1000 * 60 * 15, // 15 minutes
        onIdle: () => {
            alert("Session expired");
            signOut({ callbackUrl: "/login" });
        },
    });

    return (
        <main className="p-6 max-w-7xl mx-auto">
            <Link
                href="/"
                className="inline-block mb-4 bg-black text-white px-4 py-2 rounded-lg"
            >
                ← Back Home
            </Link>

            <Link href="/resources">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Resources
                </button>
            </Link>

            <Link href="/blogAdmin"> <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Blog & News
                </button>
            </Link>

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold mb-6 text-red-600">Admin Dashboard</h1>
                <LogoutButton />
            </div>

            
            {/* SEARCH */}
            <input
                placeholder="Search students..."
                className="border p-2 mb-6 w-full rounded"
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* CARD GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filtered.map((s) => {

                    const results = resultsMap[s._id] || [];

                    return (
                        <div key={s._id} className="bg-white p-4 rounded-xl shadow">

                            {/* HEADER */}
                            <div className="flex items-center gap-3 mb-3">
                                <Image
                                    src={s.profileImage || "/avatar.png"}
                                    alt="student"
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />

                                <div>
                                    <h2 className="font-bold">
                                        {s.firstname} {s.middlename || ""} {s.lastname}
                                    </h2>
                                    <p className="text-sm text-gray-500">{s.email}</p>
                                </div>
                            </div>

                            {/* RESULTS */}
                            <div className="mb-3">
                                <h3 className="font-semibold text-sm mb-2">Results</h3>

                                {results.length === 0 ? (
                                    <p className="text-xs text-gray-400">No results</p>
                                ) : (
                                    results.map((r: any) => (
                                        <div
                                            key={r._id}
                                            className="flex justify-between items-center border p-2 mb-1 rounded"
                                        >
                                            <span className="text-sm">
                                                {r.subject}: {r.score} ({r.className || "No class"})
                                            </span>

                                            <div className="flex gap-2 text-xs">

                                                <button
                                                    onClick={() => {
                                                        setResultStudent(s);
                                                        setEditingResultId(r._id);
                                                        setResultForm({
                                                            subject: r.subject || "",
                                                            score: r.score || "",
                                                            className: r.className || "", // ✅ FIXED
                                                            term: r.term || "",
                                                            session: r.session || "",
                                                        });
                                                    }}
                                                    className="text-blue-600"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={async () => {
                                                        await fetch("/api/result/delete", {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({ id: r._id }),
                                                        });

                                                        setResultsMap((prev) => ({
                                                            ...prev,
                                                            [s._id]: prev[s._id].filter((x: any) => x._id !== r._id),
                                                        }));
                                                    }}
                                                    className="text-red-600"
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* ACTIONS */}
                            <div className="flex flex-wrap gap-2 text-sm">

                                <button
                                    onClick={() => {
                                        setEditingStudent(s);
                                        setEditForm({
                                            firstname: s.firstname || "",
                                            middlename: s.middlename || "",
                                            lastname: s.lastname || "",
                                        });
                                    }}
                                    className="text-blue-600"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        setResultStudent(s);
                                        setEditingResultId(null);
                                        setResultForm({
                                            subject: "",
                                            score: "",
                                            term: "",
                                            session: "",
                                            className: "",
                                        });
                                    }}
                                    className="text-green-600"
                                >
                                    Add Result
                                </button>

                                <button
                                    onClick={async () => {
                                        if (!confirm("Delete student?")) return;

                                        await fetch("/api/student/delete", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ id: s._id }),
                                        });

                                        setStudentsState((prev) =>
                                            prev.filter((x) => x._id !== s._id)
                                        );
                                    }}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    );
                })}
            </div>

            {/* ================= EDIT STUDENT MODAL ================= */}
            {editingStudent && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">

                        <h2 className="font-bold mb-4">Edit Student</h2>

                        <input
                            className="border p-2 w-full mb-2"
                            value={editForm.firstname}
                            onChange={(e) =>
                                setEditForm({ ...editForm, firstname: e.target.value })
                            }
                            placeholder="First Name"
                        />

                        <input
                            className="border p-2 w-full mb-2"
                            value={editForm.middlename}
                            onChange={(e) =>
                                setEditForm({ ...editForm, middlename: e.target.value })
                            }
                            placeholder="Middle Name"
                        />

                        <input
                            className="border p-2 w-full mb-4"
                            value={editForm.lastname}
                            onChange={(e) =>
                                setEditForm({ ...editForm, lastname: e.target.value })
                            }
                            placeholder="Last Name"
                        />

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setEditingStudent(null)} className="border px-3 py-1">
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    await fetch("/api/student/update", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            id: editingStudent._id,
                                            ...editForm,
                                        }),
                                    });

                                    setStudentsState((prev) =>
                                        prev.map((x) =>
                                            x._id === editingStudent._id
                                                ? { ...x, ...editForm }
                                                : x
                                        )
                                    );

                                    setEditingStudent(null);
                                }}
                                className="bg-blue-600 text-white px-3 py-1"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= RESULT MODAL ================= */}
            {resultStudent && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">

                        <h2 className="font-bold mb-4">
                            {editingResultId ? "Edit Result" : "Add Result"}
                        </h2>

                        <input
                            placeholder="Class (e.g SS2)"
                            className="border p-2 w-full mb-2"
                            value={resultForm.className}
                            onChange={(e) =>
                                setResultForm({ ...resultForm, className: e.target.value })
                            }
                        />

                        <input
                            placeholder="Subject"
                            className="border p-2 w-full mb-2"
                            value={resultForm.subject}
                            onChange={(e) =>
                                setResultForm({ ...resultForm, subject: e.target.value })
                            }
                        />

                        <input
                            placeholder="Score"
                            type="number"
                            className="border p-2 w-full mb-2"
                            value={resultForm.score}
                            onChange={(e) =>
                                setResultForm({ ...resultForm, score: e.target.value })
                            }
                        />

                        <input
                            placeholder="Term"
                            className="border p-2 w-full mb-2"
                            value={resultForm.term}
                            onChange={(e) =>
                                setResultForm({ ...resultForm, term: e.target.value })
                            }
                        />

                        <input
                            placeholder="Session"
                            className="border p-2 w-full mb-4"
                            value={resultForm.session}
                            onChange={(e) =>
                                setResultForm({ ...resultForm, session: e.target.value })
                            }
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setResultStudent(null);
                                    setEditingResultId(null);
                                }}
                                className="border px-3 py-1 w-full"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {

                                    if (editingResultId) {
                                        const res = await fetch("/api/result/update", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                id: editingResultId,
                                                ...resultForm,
                                            }),
                                        });

                                        if (!res.ok) {
                                            console.error("Update failed");
                                            return;
                                        }

                                        const data = await res.json();

                                        setResultsMap((prev) => ({
                                            ...prev,
                                            [resultStudent._id]: prev[resultStudent._id].map((r: any) =>
                                                r._id === editingResultId ? data.updated : r
                                            ),
                                        }));

                                    } else {
                                        const res = await fetch("/api/result/create", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                studentId: resultStudent._id,
                                                ...resultForm,
                                            }),
                                        });

                                        if (!res.ok) {
                                            console.error("Create failed");
                                            return;
                                        }

                                        const data = await res.json();
                                        console.log(data);

                                        setResultsMap((prev) => ({
                                            ...prev,
                                            [resultStudent._id]: [
                                                ...(prev[resultStudent._id] || []),
                                                data.result,
                                            ],
                                        }));
                                    }

                                    setResultStudent(null);
                                    setEditingResultId(null);
                                }}
                                className="bg-green-600 text-white px-3 py-1 w-full"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow mt-10">

                <h2 className="text-2xl font-bold mb-4">
                    Upload Resource
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        placeholder="Title"
                        className="border p-2 rounded"
                        onChange={(e) =>
                            setResourceForm({
                                ...resourceForm,
                                title: e.target.value,
                            })
                        }
                    />

                    <input
                        placeholder="Description"
                        className="border p-2 rounded"
                        onChange={(e) =>
                            setResourceForm({
                                ...resourceForm,
                                description: e.target.value,
                            })
                        }
                    />

                    <input
                        placeholder="Category"
                        className="border p-2 rounded"
                        onChange={(e) =>
                            setResourceForm({
                                ...resourceForm,
                                category: e.target.value,
                            })
                        }
                    />

                    <input
                        placeholder="Type (PDF / LINK / ZIP)"
                        className="border p-2 rounded"
                        onChange={(e) =>
                            setResourceForm({
                                ...resourceForm,
                                type: e.target.value,
                            })
                        }
                    />

                    <input
                        placeholder="Class (Optional)"
                        className="border p-2 rounded"
                        onChange={(e) =>
                            setResourceForm({
                                ...resourceForm,
                                className: e.target.value,
                            })
                        }
                    />

                    <input
                        placeholder="File URL"
                        className="border p-2 rounded"
                        onChange={(e) =>
                            setResourceForm({
                                ...resourceForm,
                                fileUrl: e.target.value,
                            })
                        }
                    />

                </div>

                <div className="space-y-3">

                    {resources.map((r) => (

                        <div
                            key={r._id}
                            className="border p-4 rounded flex justify-between items-center"
                        >

                            <div>
                                <h3 className="font-bold">{r.title}</h3>
                                <p className="text-sm text-gray-500">
                                    {r.category}
                                </p>
                            </div>

                            <button
                                onClick={async () => {

                                    if (!confirm("Delete this resource?")) return;

                                    await fetch("/api/resource/delete", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            id: r._id,
                                        }),
                                    });

                                    setResources((prev) =>
                                        prev.filter((x) => x._id !== r._id)
                                    );

                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

                <button
                    className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
                    onClick={async () => {

                        const res = await fetch("/api/resource/create", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(resourceForm),
                        });

                        const data = await res.json();

                        console.log(data);

                        if (data.success) {

                            alert("Resource Uploaded Successfully");

                            setResourceForm({
                                title: "",
                                description: "",
                                category: "",
                                type: "",
                                className: "",
                                fileUrl: "",
                            });

                            window.location.reload();

                        } else {

                            alert("Upload Failed");

                        }

                    }}
                >
                    Upload Resource
                </button>
            </div>

            {/* ================= BLOG MANAGEMENT ================= */}

            <div className="bg-white p-6 rounded-xl shadow mt-10">

                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-2xl font-bold">

                        Manage Blogs

                    </h2>

                    <Link href="/blogAdmin">

                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">

                            Create Blog

                        </button>

                    </Link>

                </div>



                {blogs.length === 0 ? (

                    <p className="text-gray-500">

                        No blogs uploaded yet.

                    </p>

                ) : (

                    <div className="space-y-4">

                        {blogs.map((blog: any) => (

                            <div

                                key={blog._id}

                                className="border rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"

                            >

                                {/* BLOG INFO */}

                                <div className="flex gap-4 items-center">

                                    <Image

                                        src={blog.image}

                                        alt={blog.title}

                                        width={120}

                                        height={80}

                                        className="rounded-lg object-cover w-28 h-20"

                                    />



                                    <div>

                                        <h3 className="font-bold text-lg">

                                            {blog.title}

                                        </h3>



                                        <p className="text-sm text-gray-500">

                                            {blog.category}

                                        </p>



                                        <p className="text-sm text-gray-600 line-clamp-2">

                                            {blog.excerpt}

                                        </p>

                                    </div>

                                </div>



                                {/* ACTIONS */}

                                <div className="flex gap-3">

                                    <Link href={`/blog/${blog.slug}`}>

                                        <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">

                                            View

                                        </button>

                                    </Link>



                                    <button

                                        onClick={async () => {

                                            const confirmDelete = confirm(

                                                "Delete this blog?"

                                            );



                                            if (!confirmDelete) return;



                                            try {

                                                const res = await fetch(

                                                    "/api/blog/delete",

                                                    {

                                                        method: "POST",

                                                        headers: {

                                                            "Content-Type":

                                                                "application/json",

                                                        },

                                                        body: JSON.stringify({

                                                            id: blog._id,

                                                        }),

                                                    }

                                                );



                                                const data = await res.json();



                                                if (data.success) {

                                                    setBlogs((prev) =>

                                                        prev.filter(

                                                            (b: any) =>

                                                                b._id !== blog._id

                                                        )

                                                    );



                                                    alert(

                                                        "Blog deleted successfully"

                                                    );

                                                }

                                            } catch (error) {

                                                console.error(error);

                                                alert("Delete failed");

                                            }

                                        }}

                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"

                                    >

                                        Delete

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </main>
    );
}