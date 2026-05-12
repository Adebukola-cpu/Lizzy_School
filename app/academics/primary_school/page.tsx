import Image from "next/image";
import Link from "next/link";

export default function PrimarySchoolPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* ================= HERO ================= */}
            <section className="relative h-[50vh] flex items-center justify-center text-center text-white">

                <Image
                    src="/images/primary2.jpg"
                    alt="Primary School"
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Primary School
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">
                        Building strong foundations for lifelong learning.
                    </p>
                </div>
            </section>

            {/* ================= INTRO ================= */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

                <div>
                    <h2 className="text-3xl font-bold mb-4 text-blue-600">
                        A Strong Academic Foundation
                    </h2>

                    <p className="text-gray-600 mb-4">
                        Our primary school program focuses on developing essential skills
                        in literacy, numeracy, and social interaction. We nurture curiosity,
                        creativity, and confidence in every child.
                    </p>

                    <p className="text-gray-600">
                        Through a supportive and engaging environment, pupils are encouraged
                        to explore, ask questions, and develop a love for learning.
                    </p>
                </div>

                <div className="relative h-80 w-full">
                    <Image
                        src="/images/classroom.jpg"
                        alt="Classroom"
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>

            </section>

            {/* ================= SUBJECTS ================= */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">

                    <h2 className="text-3xl font-bold mb-10">
                        Core Subjects
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        {subjects.map((sub, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                                <h3 className="font-semibold text-lg mb-2">
                                    {sub.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {sub.desc}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* ================= LEARNING STYLE ================= */}
            <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                <div className="relative h-80 w-full">
                    <Image
                        src="/images/primary2.jpg"
                        alt="Learning"
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-4 text-green-600">
                        Our Learning Approach
                    </h2>

                    <ul className="space-y-3 text-gray-700">
                        <li>✅ Interactive and engaging lessons</li>
                        <li>✅ Child-centered teaching methods</li>
                        <li>✅ Continuous assessment and feedback</li>
                        <li>✅ Use of modern educational tools</li>
                        <li>✅ Moral and character development</li>
                    </ul>
                </div>

            </section>

            {/* ================= ACTIVITIES ================= */}
            <section className="bg-gray-100 py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">

                    <h2 className="text-3xl font-bold mb-10">
                        Co-Curricular Activities
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">

                        {activities.map((act, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
                                <h3 className="font-semibold mb-2">{act.title}</h3>
                                <p className="text-gray-600 text-sm">{act.desc}</p>
                            </div>
                        ))}

                    </div>

                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="bg-blue-600 text-white text-center py-16 px-6">

                <h2 className="text-3xl font-bold mb-4">
                    Give Your Child a Great Start
                </h2>

                <p className="mb-6 text-white/90">
                    Enroll your child in a nurturing and inspiring environment.
                </p>

                <Link href="/signup">
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Apply Now
                    </button>
                </Link>

            </section>

        </main>
    );
}


/* ================= DATA ================= */

const subjects = [
    {
        title: "English Language",
        desc: "Developing reading, writing, and communication skills.",
    },
    {
        title: "Mathematics",
        desc: "Building strong numerical and problem-solving abilities.",
    },
    {
        title: "Basic Science",
        desc: "Introducing scientific thinking and curiosity.",
    },
    {
        title: "Social Studies",
        desc: "Understanding society, culture, and environment.",
    },
    {
        title: "Computer Studies",
        desc: "Basic digital literacy and computer usage.",
    },
    {
        title: "Creative Arts",
        desc: "Encouraging imagination and creativity.",
    },
];

const activities = [
    {
        title: "Sports",
        desc: "Physical activities that promote fitness and teamwork.",
    },
    {
        title: "Music & Drama",
        desc: "Developing talent in performing arts.",
    },
    {
        title: "Clubs",
        desc: "Engaging students in fun and educational groups.",
    },
];