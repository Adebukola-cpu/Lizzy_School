
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Link from "next/link";
import LogoutButton from "../components/logoutButton";

import { useIdleTimer } from "react-idle-timer";
import { signOut } from "next-auth/react";

export default function StudentClient({ student }: any) {
    const [results, setResults] = useState<any[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState("");
    const [profileSuccess, setProfileSuccess] = useState("");
    const [profileError, setProfileError] = useState("");
    const [sessionMessage, setSessionMessage] = useState("");
    const [form, setForm] = useState({
        firstname: student.firstname || "",
        middlename: student.middlename || "",
        lastname: student.lastname || "",
    });

    useEffect(() => {
        let isMounted = true;

        const fetchResults = async () => {
            try {
                const res = await fetch(`/api/result/by-student?id=${student._id}`);
                if (!res.ok) return;
                const data = await res.json();
                console.log(data);

                if (isMounted) {
                    setResults(data.results || []);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchResults();

        const interval = setInterval(fetchResults, 5000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [student._id]);

    // ✅ PDF DOWNLOAD
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Student Result", 20, 20);

        doc.setFontSize(12);
        doc.text(
            `Name: ${form.firstname} ${form.middlename} ${form.lastname}`,
            20,
            30
        );
        doc.text(`Email: ${student.email}`, 20, 40);

        let y = 60;

        results.forEach((r: any, index: number) => {
            doc.text(
                `${r?.subject || "N/A"} - ${r.score} (${r.className || "N/A"}, ${r.term}, ${r.session})`,
                20,
                y
            );
            y += 10;
        });

        doc.save("result.pdf");
    };

    useIdleTimer({
        timeout: 1000 * 60 * 15, // 15 minutes

        onIdle: () => {

            setSessionMessage("Session expired. Redirecting...");

            setTimeout(() => {

                signOut({ callbackUrl: "/login" });

            }, 2000);

        },
    });
    

    return (
        <main className="min-h-screen bg-gray-100 p-6">
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

            {sessionMessage && (
                <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
                    {sessionMessage}
                </div>
            )}

            {/* ================= HEADER ================= */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 mb-6">
                <div className="flex flex-col items-center gap-2">

                    <Image
                        src={student.profileImage || "/avatar.png"}
                        alt="profile"
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                    />

                    <label className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer text-sm hover:bg-blue-700">

                        {imageUploading ? "Uploading..." : "Change Photo"}

                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={async (e) => {

                                setUploadError("");
                                setUploadSuccess("");

                                const file = e.target.files?.[0];

                                if (!file) return;

                                // FILE SIZE VALIDATION
                                if (file.size > 2 * 1024 * 1024) {

                                    setUploadError("Image must be less than 2MB");

                                    return;
                                }

                                setImageUploading(true);

                                try {

                                    const formData = new FormData();

                                    formData.append("image", file);

                                    const res = await fetch(
                                        "/api/student/upload-image",
                                        {
                                            method: "POST",
                                            body: formData,
                                        }
                                    );

                                    const data = await res.json();

                                    if (data.success) {

                                        setUploadSuccess(
                                            "Profile image updated successfully"
                                        );

                                        window.location.reload();

                                    } else {

                                        setUploadError(
                                            data.message || "Upload failed"
                                        );
                                    }

                                } catch (err) {

                                    console.error(err);

                                    setUploadError("Something went wrong");
                                }

                                setImageUploading(false);
                            }}
                        />
                    </label>

                    {/* ERROR MESSAGE */}
                    {uploadError && (
                        <p className="text-red-500 text-xs text-center">
                            {uploadError}
                        </p>
                    )}

                    {/* SUCCESS MESSAGE */}
                    {uploadSuccess && (
                        <p className="text-green-600 text-xs text-center">
                            {uploadSuccess}
                        </p>
                    )}

                </div>


                <div>
                    <h1 className="text-xl font-bold">
                        {form.firstname} {form.middlename} {form.lastname}
                    </h1>
                    <p className="text-gray-500">{student.email}</p>
                </div>
            </div>

            {/* ================= DASHBOARD ================= */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="font-semibold mb-2">Profile</h2>
                    <p className="text-sm text-gray-500">
                          <button
                                onClick={() => setEditMode(!editMode)}
                                className="text-blue-600"
                            >
                            View and update your information
                            </button>
                    </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="font-semibold mb-2">Results</h2>
                    <p className="text-sm text-gray-500">
                        <button
                            onClick={downloadPDF}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Download PDF
                        </button>
                    </p>
                </div>
            </div>

            {/* ================= RESULTS ================= */}
            <div className="mt-6 bg-white p-4 rounded shadow">
                <h2 className="font-bold mb-3">My Results</h2>

                {results.length === 0 ? (
                    <p>No results yet</p>
                ) : (
                    <>
                        {/* ✅ TABLE ONLY TABLE CONTENT */}
                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2">Class</th>
                                    <th className="p-2">Subject</th>
                                    <th className="p-2">Score</th>
                                    <th className="p-2">Term</th>
                                    <th className="p-2">Session</th>
                                </tr>
                            </thead>

                            <tbody>
                                    {results?.filter(Boolean).map((r: any) => (
                                    <tr key={r._id} className="border-t">
                                        <td className="p-2">{r.className}</td>
                                        <td className="p-2">{r.subject}</td>
                                        <td className="p-2">{r.score}</td>
                                        <td className="p-2">{r.term}</td>
                                        <td className="p-2">{r.session}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </>
                )}

                {/* ================= EDIT PROFILE ================= */}
                {editMode && (
                    <div className="mt-4 bg-gray-100 p-4 rounded">
                        <input
                            value={form.firstname}
                            onChange={(e) =>
                                setForm({ ...form, firstname: e.target.value })
                            }
                            className="border p-2 mr-2 mb-2"
                            placeholder="First Name"
                        />

                        <input
                            value={form.middlename}
                            onChange={(e) =>
                                setForm({ ...form, middlename: e.target.value })
                            }
                            className="border p-2 mr-2 mb-2"
                            placeholder="Middle Name"
                        />

                        <input
                            value={form.lastname}
                            onChange={(e) =>
                                setForm({ ...form, lastname: e.target.value })
                            }
                            className="border p-2 mr-2 mb-2"
                            placeholder="Last Name"
                        />

                        <div className="mt-2">
                            <button
                                onClick={async () => {
                                    setProfileError("");
                                    setProfileSuccess("");
                                    try {
                            const res = await fetch("/api/student/update-self", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(form),
                                     });

                            const data = await res.json();

                                        if (data.success) {

                                            setProfileSuccess(
                                                "Profile updated successfully"
                                            );

                                            setEditMode(false);

                                        } else {

                                            setProfileError(
                                                data.message || "Update failed"
                                            );
                                        }

                                    } catch (err) {

                                        setProfileError("Something went wrong");
                                    }
                                }}
                                className="bg-green-600 text-white px-3 py-1"
                            >
                                Save
                            </button>

                            {profileError && (
                                <p className="text-red-500 text-sm mt-2">
                                    {profileError}
                                </p>
                            )}

                            {profileSuccess && (
                                <p className="text-green-600 text-sm mt-2">
                                    {profileSuccess}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center mb-4 p-3">
                <LogoutButton />
            </div>

        </main>
    );
}