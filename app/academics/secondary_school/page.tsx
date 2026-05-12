import Image from "next/image";
import Link from "next/link";

export default function SecondarySchoolPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* ================= HERO ================= */}
            <section className="relative h-[40vh] flex items-center justify-center text-center text-white">
                            <Image
                                src="/images/secondary.webp"
                                alt="Secondary School"
                                fill
                                className="object-cover"
                            />
                            
                <div className="relative z-10 px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Secondary School
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">
                        Preparing students for academic excellence and future success.
                    </p>
                </div>
            </section>

            {/* ================= INTRO ================= */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

                <div>
                    <h2 className="text-3xl font-bold mb-4 text-green-600">
                        Academic Excellence & Leadership
                    </h2>

                    <p className="text-gray-600 mb-4">
                        Our secondary school program is designed to prepare students for
                        WAEC, NECO, and international examinations while building leadership,
                        discipline, and critical thinking skills.
                    </p>

                    <p className="text-gray-600">
                        Students are guided to discover their strengths and specialize in
                        areas that align with their future careers.
                    </p>
                </div>

                <div className="relative h-80 w-full">
                    <Image
                        src="/images/science.jpg"
                        alt="Science Lab"
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>

            </section>

            {/* ================= SUBJECT GROUPS ================= */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">

                    <h2 className="text-3xl font-bold mb-10">
                        Academic Departments
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        {departments.map((dept, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-xl transition">
                                <h3 className={`font-bold text-lg mb-3 ${dept.color}`}>
                                    {dept.title}
                                </h3>

                                <ul className="text-gray-700 text-sm space-y-1">
                                    {dept.subjects.map((sub, index) => (
                                        <li key={index}>• {sub}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* ================= LEARNING APPROACH ================= */}
            <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                <div className="relative h-80 w-full">
                    <Image
                        src="/images/studentlearn.jpg"
                        alt="Students Learning"
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-4 text-blue-600">
                        Our Approach to Learning
                    </h2>

                    <ul className="space-y-3 text-gray-700">
                        <li>🎯 Exam-focused preparation (WAEC, NECO)</li>
                        <li>📊 Continuous assessment & performance tracking</li>
                        <li>💻 Integration of technology in learning</li>
                        <li>🧠 Critical thinking and problem-solving</li>
                        <li>👨‍🏫 Experienced and dedicated teachers</li>
                    </ul>
                </div>

            </section>

            {/* ================= ACTIVITIES ================= */}
            <section className="bg-gray-100 py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">

                    <h2 className="text-3xl font-bold mb-10">
                        Student Development Activities
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        {activities.map((act, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                                <h3 className="font-semibold mb-2">{act.title}</h3>
                                <p className="text-gray-600 text-sm">{act.desc}</p>
                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="bg-green-600 text-white text-center py-16 px-6">

                <h2 className="text-3xl font-bold mb-4">
                    Prepare for a Successful Future
                </h2>

                <p className="mb-6 text-white/90">
                    Give your child the tools to excel academically and beyond.
                </p>

                <Link href="/signup">
                    <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Apply Now
                    </button>
                </Link>

            </section>

        </main>
    );
}


/* ================= DATA ================= */

const departments = [
    {
        title: "Science",
        color: "text-green-600",
        subjects: ["Physics", "Chemistry", "Biology", "Further Mathematics"],
    },
    {
        title: "Arts",
        color: "text-purple-600",
        subjects: ["Literature", "Government", "History", "CRS"],
    },
    {
        title: "Commercial",
        color: "text-blue-600",
        subjects: ["Accounting", "Economics", "Commerce", "Business Studies"],
    },
];

const activities = [
    {
        title: "Debate & Public Speaking",
        desc: "Building confidence, communication, and leadership skills.",
    },
    {
        title: "Science & Tech Clubs",
        desc: "Encouraging innovation and hands-on experimentation.",
    },
    {
        title: "Sports & Competitions",
        desc: "Promoting teamwork, discipline, and physical fitness.",
    },
];