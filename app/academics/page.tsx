import Link from "next/link";
import Image from "next/image";

export default function AcademicsPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* ================= HERO ================= */}
            <section className="relative h-[40vh] flex items-center justify-center text-center text-white">
                <Image
                    src="/images/studentExam.jpg"
                    alt="Academics"
                    fill
                    className="object-cover"
                />
                <div className="relative z-10 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Academics
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg">
                        Empowering students with knowledge, skills, and values for lifelong success.
                    </p>
                </div>
            </section>

            {/* ================= INTRO ================= */}
            <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                <div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">
                        Our Academic Excellence
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Our academic program is designed to provide a balanced education
                        that combines strong theoretical knowledge with practical skills.
                    </p>
                    <p className="text-gray-600">
                        We focus on developing critical thinking, creativity, and leadership
                        qualities in our students to prepare them for global opportunities.
                    </p>
                </div>

                <div className="relative h-80 w-full">
                    <Image
                        src="/images/studentlearn.jpg"
                        alt="Academics"
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>

            </section>

            {/* ================= LEVELS ================= */}
            <section className="py-20 px-6 bg-white">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Academic Levels
                </h2>

                <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

                    {/* PRIMARY */}
                    <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition">
                        <h3 className="text-2xl font-bold text-blue-600 mb-3">
                            Primary School
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Our primary school builds a strong foundation in literacy,
                            numeracy, and social skills, ensuring every child develops
                            confidence and curiosity.
                        </p>

                        <Link href="/academics/primary_school">
                            <button className="text-blue-600 font-semibold hover:underline">
                                Explore Primary →
                            </button>
                        </Link>
                    </div>

                    {/* SECONDARY */}
                    <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition">
                        <h3 className="text-2xl font-bold text-green-600 mb-3">
                            Secondary School
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Our secondary program prepares students for higher education
                            and career success through specialized subjects and advanced learning.
                        </p>

                        <Link href="/academics/secondary_school">
                            <button className="text-green-600 font-semibold hover:underline">
                                Explore Secondary →
                            </button>
                        </Link>
                    </div>

                </div>
            </section>

            {/* ================= CURRICULUM ================= */}
            <section className="py-20 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                    <div className="relative h-80 w-full">
                        <Image
                            src="/images/curriculum.jpg"
                            alt="Curriculum"
                            fill
                            className="object-cover rounded-2xl"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">
                            Our Curriculum
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Our curriculum is carefully structured to meet national and
                            international standards while fostering innovation and creativity.
                        </p>

                        <Link href="/academics/curriculum">
                            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                                View Curriculum
                            </button>
                        </Link>
                    </div>

                </div>
            </section>

            {/* ================= DEPARTMENTS ================= */}
            <section className="py-20 px-6 bg-white">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Our Departments
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
                        <h3 className="font-semibold mb-2">Science</h3>
                        <p className="text-sm text-gray-600">
                            Physics, Chemistry, Biology, and Technology.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
                        <h3 className="font-semibold mb-2">Arts</h3>
                        <p className="text-sm text-gray-600">
                            Literature, Government, History, and Creative Arts.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
                        <h3 className="font-semibold mb-2">Commercial</h3>
                        <p className="text-sm text-gray-600">
                            Accounting, Economics, Commerce, and Business Studies.
                        </p>
                    </div>

                </div>

                <div className="text-center mt-8">
                    <Link href="/academics/departments">
                        <button className="text-blue-600 font-semibold hover:underline">
                            View All Departments →
                        </button>
                    </Link>
                </div>
            </section>

            {/* ================= FEATURES ================= */}
            <section className="py-20 px-6 bg-gray-100">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Why Our Academics Stand Out
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <h3 className="font-semibold mb-2">Experienced Teachers</h3>
                        <p className="text-sm text-gray-600">
                            Highly trained educators committed to student success.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <h3 className="font-semibold mb-2">Modern Facilities</h3>
                        <p className="text-sm text-gray-600">
                            Well-equipped labs, libraries, and smart classrooms.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <h3 className="font-semibold mb-2">Holistic Learning</h3>
                        <p className="text-sm text-gray-600">
                            Academics combined with extracurricular excellence.
                        </p>
                    </div>

                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="py-20 text-center bg-blue-600 text-white">
                <h2 className="text-3xl font-bold mb-4">
                    Start Your Academic Journey With Us
                </h2>
                <p className="mb-6">
                    Join a school that nurtures excellence and success.
                </p>

                <Link href="/signup">
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                        Apply Now
                    </button>
                </Link>
            </section>

        </main>
    );
}