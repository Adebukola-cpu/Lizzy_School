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
    const [editImage, setEditImage] = useState<File | null>(null);

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
        className: "",
    });

    const [resourceFile, setResourceFile] = useState<File | null>(null);

    const [resourceLoading, setResourceLoading] = useState(false);

    const [resourceMessage, setResourceMessage] = useState("");

    const [resources, setResources] = useState<any[]>([]);
    const [blogs, setBlogs] = useState([]);
    const [fileKey, setFileKey] = useState(Date.now());
    const [sessionMessage, setSessionMessage] = useState("");
    const [adminMessage, setAdminMessage] = useState("");
    const [adminError, setAdminError] = useState("");
    const [showDeleteStudent, setShowDeleteStudent] = useState<string | null>(null);
    const [showDeleteResource, setShowDeleteResource] = useState<string | null>(null);
    const [showDeleteBlog, setShowDeleteBlog] = useState<string | null>(null);
    const [openSection, setOpenSection] = useState<string | null>("dashboard");

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

            setSessionMessage(
                "Session expired. Redirecting to login..."
            );

            setTimeout(() => {

                signOut({
                    callbackUrl: "/login",
                });

            }, 2000);

        },
    });

    const resourceCategories = [
        "Mathematics",
        "English",
        "Physics",
        "Chemistry",
        "Biology",
        "Economics",
        "Government",
        "Civic Education",
        "Computer Science",
        "Agricultural Science",
        "Further Mathematics",
    ];

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <main className="flex flex-col md:flex-row min-h-screen bg-gray-100">

            {/* LEFT SIDEBAR */}
            <aside className="w-full md:w-64 bg-white shadow-lg p-4 h-screen sticky top-0 overflow-y-auto">

                <h1 className="text-2xl font-bold text-red-600 mb-6">
                    Admin Panel
                </h1>

                <div className="space-y-3">

                    {/* DASHBOARD */}
                    <div>
                        <button
                            onClick={() => toggleSection("dashboard")}
                            className="w-full text-left font-semibold bg-gray-100 hover:bg-red-100 transition p-3 rounded-lg"
                        >
                            <div className="flex justify-between items-center">
                                <span>Dashboard</span>
                                <span>
                                    {openSection === "dashboard" ? "−" : "+"}
                                </span>
                            </div>
                        </button>

                        {openSection === "dashboard" && (
                            <div className="mt-3 pl-2">
                                <p className="text-sm text-gray-600">
                                    Student management section
                                </p>
                            </div>
                        )}
                    </div>

                    {/* RESOURCES */}
                    <div>
                        <button
                            onClick={() => toggleSection("resources")}
                            className="w-full text-left font-semibold bg-gray-100 hover:bg-red-100 transition p-3 rounded-lg"
                        >
                            <div className="flex justify-between items-center">
                                <span>Upload Resource</span>
                                <span>
                                    {openSection === "resources" ? "−" : "+"}
                                </span>
                            </div>
                        </button>

                        {openSection === "resources" && (
                            <div className="mt-3 pl-2">
                                <p className="text-sm text-gray-600">
                                    Upload PDFs, videos and files
                                </p>
                            </div>
                        )}
                    </div>

                    {/* BLOGS */}
                    <div>
                        <button
                            onClick={() => toggleSection("blogs")}
                            className="w-full text-left font-semibold bg-gray-100 hover:bg-red-100 transition p-3 rounded-lg"
                        >
                            <div className="flex justify-between items-center">
                                <span>Manage Blogs</span>
                                <span>
                                    {openSection === "blogs" ? "−" : "+"}
                                </span>
                            </div>
                        </button>

                        {openSection === "blogs" && (
                            <div className="mt-3 pl-2">
                                <p className="text-sm text-gray-600">
                                    Create and manage blog posts
                                </p>
                            </div>
                        )}
                    </div>

                </div>

                <div className="mt-10">
                    <LogoutButton />
                </div>

                <div className="space-y-2 mb-6">

                    <Link
                        href="/"
                        className="block bg-black text-white px-4 py-2 rounded-lg text-center"
                    >
                        Back Home
                    </Link>

                    <Link
                        href="/resources"
                        className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                    >
                        Resources
                    </Link>

                    <Link
                        href="/blogAdmin"
                        className="block bg-emerald-600 text-white px-4 py-2 rounded-lg text-center"
                    >
                        Blog & News
                    </Link>

                </div>

            </aside>

            {/* RIGHT CONTENT */}
            <section className="flex-1 p-6 overflow-y-auto">

                {sessionMessage && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
                        {sessionMessage}
                    </div>
                )}

                {adminMessage && (
                    <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
                        {adminMessage}
                    </div>
                )}

                {adminError && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                        {adminError}
                    </div>
                )}

                {/* CONTENT FOR DASHBOARD */}
                {openSection === "dashboard" && (
                    <>
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
                        
                                                        {showDeleteStudent === s._id ? (
                        
                                                            <div className="flex gap-2">
                        
                                                                <button
                                                                    onClick={async () => {
                        
                                                                        try {
                        
                                                                            const res = await fetch("/api/student/delete", {
                                                                                method: "POST",
                                                                                headers: {
                                                                                    "Content-Type": "application/json",
                                                                                },
                                                                                body: JSON.stringify({
                                                                                    id: s._id,
                                                                                }),
                                                                            });
                        
                                                                            const data = await res.json();
                        
                                                                            if (data.success) {
                        
                                                                                setStudentsState((prev) =>
                                                                                    prev.filter((x) => x._id !== s._id)
                                                                                );
                        
                                                                                setAdminMessage(
                                                                                    "Student deleted successfully"
                                                                                );
                        
                                                                            } else {
                        
                                                                                setAdminError(
                                                                                    data.message || "Delete failed"
                                                                                );
                        
                                                                            }
                        
                                                                        } catch (error) {
                        
                                                                            console.log(error);
                        
                                                                            setAdminError("Something went wrong");
                        
                                                                        }
                        
                                                                        setShowDeleteStudent(null);
                        
                                                                    }}
                                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                                >
                                                                    Confirm
                                                                </button>
                        
                                                                <button
                                                                    onClick={() => setShowDeleteStudent(null)}
                                                                    className="border px-3 py-1 rounded"
                                                                >
                                                                    Cancel
                                                                </button>
                        
                                                            </div>
                        
                                                        ) : (
                        
                                                            <button
                                                                onClick={() => setShowDeleteStudent(s._id)}
                                                                className="text-red-600"
                                                            >
                                                                Delete
                                                            </button>
                        
                                                        )}
                        
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
                        
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="border p-2 w-full mb-4"
                                                    onChange={(e) => {
                                                        if (e.target.files?.[0]) {
                                                            setEditImage(e.target.files[0]);
                                                        }
                                                    }}
                                                />
                        
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => setEditingStudent(null)} className="border px-3 py-1">
                                                        Cancel
                                                    </button>
                        
                                                    <button
                                                        onClick={async () => {
                        
                                                            try {
                        
                                                                const formData = new FormData();
                        
                                                                formData.append("id", editingStudent._id);
                                                                formData.append("firstname", editForm.firstname);
                                                                formData.append("middlename", editForm.middlename);
                                                                formData.append("lastname", editForm.lastname);
                        
                                                                if (editImage) {
                                                                    formData.append("profileImage", editImage);
                                                                }
                        
                                                                const res = await fetch("/api/student/update", {
                                                                    method: "POST",
                                                                    body: formData,
                                                                });
                        
                                                                const data = await res.json();
                        
                                                                if (data.success) {
                        
                                                                    setStudentsState((prev) =>
                                                                        prev.map((x) =>
                                                                            x._id === editingStudent._id
                                                                                ? data.student
                                                                                : x
                                                                        )
                                                                    );
                        
                                                                    setAdminMessage("Student updated successfully");
                        
                                                                } else {
                        
                                                                    setAdminError(data.message || "Update failed");
                        
                                                                }
                        
                                                            } catch (error) {
                        
                                                                console.log(error);
                                                                setAdminError("Something went wrong");
                        
                                                            }
                        
                                                            setEditingStudent(null);
                                                            setEditImage(null);
                        
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
                    </>
                )}

                {/* CONTENT FOR RESOURCES */}
                {openSection === "resources" && (
                    <>
                        <div className="bg-white p-6 rounded-xl shadow mt-10">

                            <div className="mb-4">
                                <h2 className="text-2xl font-bold mb-4">
                                    Upload Resource
                                </h2>

                                <div className="grid md:grid-cols-2 gap-4">

                                    <input
                                        placeholder="Title"
                                        value={resourceForm.title}
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
                                        value={resourceForm.description}
                                        className="border p-2 rounded"
                                        onChange={(e) =>
                                            setResourceForm({
                                                ...resourceForm,
                                                description: e.target.value,
                                            })
                                        }
                                    />

                                    <select
                                        value={resourceForm.category}
                                        className="border p-2 rounded"
                                        onChange={(e) =>
                                            setResourceForm({
                                                ...resourceForm,
                                                category: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Select Category</option>

                                        {resourceCategories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>

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
                                        key={fileKey}
                                        type="file"
                                        accept="video/*,.pdf,image/*"
                                        className="border p-2 rounded"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                setResourceFile(e.target.files[0]);
                                            }
                                        }}
                                    />

                                </div>

                                <button
                                    className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
                                    disabled={resourceLoading}
                                    onClick={async () => {

                                        setResourceMessage("");

                                        if (!resourceFile) {
                                            setResourceMessage("Please select a file");
                                            return;
                                        }

                                        try {

                                            setResourceLoading(true);

                                            const formData = new FormData();

                                            formData.append("title", resourceForm.title);
                                            formData.append("description", resourceForm.description);
                                            formData.append("category", resourceForm.category);
                                            formData.append("className", resourceForm.className);

                                            formData.append("file", resourceFile);

                                            const res = await fetch("/api/resource/upload", {
                                                method: "POST",
                                                body: formData,
                                            });

                                            const data = await res.json();

                                            if (data.success) {

                                                setResourceMessage("Resource uploaded successfully");

                                                setResourceForm({
                                                    title: "",
                                                    description: "",
                                                    category: "",
                                                    className: "",
                                                });

                                                setResourceFile(null);
                                                setFileKey(Date.now());
                                                setResources((prev) => [
                                                    data.resource,
                                                    ...prev,
                                                ]);

                                            } else {

                                                setResourceMessage(
                                                    data.message || "Upload failed"
                                                );

                                            }

                                        } catch (error) {

                                            console.log(error);

                                            setResourceMessage("Something went wrong");

                                        } finally {

                                            setResourceLoading(false);

                                        }

                                    }}
                                >
                                    {resourceLoading ? "Uploading..." : "Upload Resource"}
                                </button>
                                {resourceMessage && (
                                    <p className="mt-3 text-sm text-gray-600">
                                        {resourceMessage}
                                    </p>
                                )}
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

                                        {showDeleteResource === r._id ? (

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={async () => {

                                                        try {

                                                            const res = await fetch("/api/resource/delete", {

                                                                method: "POST",

                                                                headers: {
                                                                    "Content-Type": "application/json",
                                                                },

                                                                body: JSON.stringify({
                                                                    id: r._id,
                                                                }),

                                                            });

                                                            const data = await res.json();

                                                            if (data.success) {

                                                                setResources((prev) =>
                                                                    prev.filter((x) => x._id !== r._id)
                                                                );

                                                                setAdminMessage(
                                                                    "Resource deleted successfully"
                                                                );

                                                            } else {

                                                                setAdminError(
                                                                    data.message || "Delete failed"
                                                                );

                                                            }

                                                        } catch (error) {

                                                            console.log(error);

                                                            setAdminError("Something went wrong");

                                                        }

                                                        setShowDeleteResource(null);

                                                    }}
                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Confirm
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        setShowDeleteResource(null)
                                                    }
                                                    className="border px-3 py-1 rounded"
                                                >
                                                    Cancel
                                                </button>

                                            </div>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    setShowDeleteResource(r._id)
                                                }
                                                className="text-red-600"
                                            >
                                                Delete
                                            </button>

                                        )}
                                    </div>

                                ))}

                            </div>


                        </div>

                    </>
                )}

                {/* CONTENT FOR BLOGS */}
                {openSection === "blogs" && (
                    <>
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



                                                {showDeleteBlog === blog._id ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={async () => {
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

                                                                        setAdminMessage(
                                                                            "Blog deleted successfully"
                                                                        );
                                                                    } else {
                                                                        setAdminError(
                                                                            data.message || "Delete failed"
                                                                        );
                                                                    }
                                                                } catch (error) {
                                                                    console.log(error);
                                                                    setAdminError("Something went wrong");
                                                                }

                                                                setShowDeleteBlog(null);
                                                            }}
                                                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                                        >
                                                            Confirm
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                setShowDeleteBlog(null)
                                                            }
                                                            className="border px-4 py-2 rounded-lg"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            setShowDeleteBlog(blog._id)
                                                        }
                                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>
                    </>
                )}

            </section>

        </main>
    );
}