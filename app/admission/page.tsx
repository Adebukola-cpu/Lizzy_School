import Link from "next/link";
import Image from "next/image";

export default function AdmissionsPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* ================= HERO ================= */}
            <section className="relative h-[40vh] flex items-center justify-center text-center text-white">
                    <Image
                    src="/images/goingTo_school.jpg"
                    alt="Academics"
                    fill
                    className="object-cover"
                />
                <div className="relative z-10 px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Admissions
                </h1>
                <p className="max-w-2xl mx-auto text-lg">
                    Begin your child’s journey to excellence with us today.
                </p>
                </div>
            </section>

            {/* ================= INTRO ================= */}
            <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                <div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">
                        Welcome to Our School
                    </h2>
                    <p className="text-gray-600 mb-4">
                        We are excited that you are considering our school for your child.
                        Our admission process is designed to be simple, transparent,
                        and accessible to all families.
                    </p>
                    <p className="text-gray-600">
                        We welcome students who are eager to learn, grow, and become
                        responsible leaders of tomorrow.
                    </p>
                </div>

                <div className="relative h-80 w-full">
                    <Image
                        src="/images/admission.jpg"
                        alt="Admissions"
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>

            </section>

            {/* ================= HOW TO APPLY ================= */}
            <section className="py-20 px-6 bg-white">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    How to Apply
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
                        <h3 className="text-xl font-bold mb-2 text-blue-600">1. Apply Online</h3>
                        <p className="text-gray-600 text-sm">
                            Fill out the online application form with accurate details.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
                        <h3 className="text-xl font-bold mb-2 text-green-600">2. Screening</h3>
                        <p className="text-gray-600 text-sm">
                            Students may be invited for an entrance test or interview.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
                        <h3 className="text-xl font-bold mb-2 text-purple-600">3. Admission</h3>
                        <p className="text-gray-600 text-sm">
                            Successful candidates receive an admission offer.
                        </p>
                    </div>

                </div>
            </section>

            {/* ================= LINKS TO DETAILS ================= */}
            <section className="py-20 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

                    {/* REQUIREMENTS */}
                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
                        <h3 className="text-2xl font-bold mb-3 text-blue-600">
                            Admission Requirements
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Learn about the documents and criteria required for admission
                            into our school.
                        </p>

                        <Link href="/admission/requirements">
                            <button className="text-blue-600 font-semibold hover:underline">
                                View Requirements →
                            </button>
                        </Link>
                    </div>

                    {/* PROCESS */}
                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
                        <h3 className="text-2xl font-bold mb-3 text-green-600">
                            Application Process
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Understand the step-by-step process of how admission works.
                        </p>

                        <Link href="/admission/process">
                            <button className="text-green-600 font-semibold hover:underline">
                                View Process →
                            </button>
                        </Link>
                    </div>

                </div>
            </section>

            {/* ================= WHY CHOOSE US ================= */}
            <section className="py-20 px-6 bg-white">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Why Choose Our School
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
                        <h3 className="font-semibold mb-2">Academic Excellence</h3>
                        <p className="text-sm text-gray-600">
                            Proven track record of outstanding academic performance.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
                        <h3 className="font-semibold mb-2">Safe Environment</h3>
                        <p className="text-sm text-gray-600">
                            A secure and nurturing environment for learning.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl shadow text-center">
                        <h3 className="font-semibold mb-2">Holistic Development</h3>
                        <p className="text-sm text-gray-600">
                            We develop both academic and life skills.
                        </p>
                    </div>

                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="py-20 text-center bg-blue-600 text-white">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Apply?
                </h2>
                <p className="mb-6">
                    Start your application today and secure your child’s future.
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                    <Link href="/signup">
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                            Apply Now
                        </button>
                    </Link>

                    <Link href="/contact">
                        <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </section>

        </main>
    );
}