"use client";

import Image from "next/image";

export default function DepartmentsPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* ================= HERO ================= */}
            <section className="relative h-[50vh] flex items-center justify-center text-center text-white">

                <Image
                    src="/images/departments.jpg"
                    alt="Departments"
                    fill
                    className="object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/70" />

                <div className="relative z-10 px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Our Departments
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">
                        Explore the academic divisions shaping excellence, innovation, and leadership.
                    </p>
                </div>
            </section>

            {/* ================= INTRO ================= */}
            <section className="max-w-6xl mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    A Structure Built for Excellence
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Our departments are carefully designed to provide specialized learning,
                    allowing students to discover their strengths and develop skills
                    for future success.
                </p>
            </section>

            {/* ================= DEPARTMENTS ================= */}
            <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">

                {departments.map((dept, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group"
                    >
                        <div className="relative h-48">
                            <Image
                                src={dept.image}
                                alt={dept.title}
                                fill
                                className="object-cover group-hover:scale-110 transition duration-500"
                            />
                        </div>

                        <div className="p-6">
                            <h3 className={`text-xl font-bold mb-2 ${dept.color}`}>
                                {dept.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-4">
                                {dept.description}
                            </p>

                            <ul className="text-sm text-gray-700 space-y-1">
                                {dept.subjects.map((sub, i) => (
                                    <li key={i}>• {sub}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

            </section>

            {/* ================= HOD SECTION ================= */}
            <section className="bg-white py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">

                    <h2 className="text-3xl font-bold mb-10">
                        Meet Our Department Leaders
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        {hods.map((hod, index) => (
                            <div key={index} className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">

                                <h3 className="font-bold text-lg">{hod.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{hod.role}</p>

                                <p className="text-gray-600 text-sm">
                                    {hod.desc}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="bg-blue-600 text-white text-center py-16 px-6">
                <h2 className="text-3xl font-bold mb-3">
                    Join a Department That Fits You
                </h2>

                <p className="mb-6 text-white/90">
                    We nurture every student’s strength and passion.
                </p>

                <a
                    href="/admissions"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                    Apply Now
                </a>
            </section>

        </main>
    );
}

/* ================= DATA ================= */

const departments = [
    {
        title: "Science Department",
        color: "text-green-600",
        image: "/images/science.jpg",
        description: "Focused on innovation, experiments, and scientific discovery.",
        subjects: ["Physics", "Chemistry", "Biology", "Basic Science"],
    },
    {
        title: "Arts & Humanities",
        color: "text-purple-600",
        image: "/images/art.jpg",
        description: "Developing creativity, communication, and cultural awareness.",
        subjects: ["Literature", "Government", "History", "CRS"],
    },
    {
        title: "Commercial Department",
        color: "text-blue-600",
        image: "/images/commercial.jpg",
        description: "Preparing students for business and financial careers.",
        subjects: ["Accounting", "Economics", "Commerce", "Business Studies"],
    },
    {
        title: "ICT Department",
        color: "text-indigo-600",
        image: "/images/ict.jpg",
        description: "Building strong digital and technological skills.",
        subjects: ["Computer Studies", "Coding", "Digital Literacy"],
    },
    {
        title: "Vocational Studies",
        color: "text-orange-600",
        image: "/images/vocation.jpg",
        description: "Hands-on skills for real-world independence.",
        subjects: ["Home Economics", "Agriculture", "Technical Drawing"],
    },
    {
        title: "Sports & Physical Education",
        color: "text-red-600",
        image: "/images/sport.jpg",
        description: "Promoting fitness, teamwork, and discipline.",
        subjects: ["Athletics", "Football", "Indoor Games"],
    },
];

const hods = [
    {
        name: "Mr. Adewale",
        role: "Head of Science",
        desc: "Passionate about developing future scientists through practical learning.",
    },
    {
        name: "Mrs. Johnson",
        role: "Head of Arts",
        desc: "Focused on creativity, expression, and cultural excellence.",
    },
    {
        name: "Mr. Okafor",
        role: "Head of Commercial",
        desc: "Preparing students for success in business and finance.",
    },
];