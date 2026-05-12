"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdmissionProcessPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="relative h-[40vh] flex items-center justify-center text-center text-white">
                <Image
                    src="/images/goingTo_school.jpg"
                    alt="Academics"
                    fill
                    className="object-cover"
                />
                <div className="relative z-10 px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Admission Process
                </h1>
                <p className="max-w-2xl mx-auto text-lg">
                    Follow these simple steps to enroll your child in our school.
                </p>
                </div>
            </section>

            {/* STEPS */}
            <section className="py-16 px-6 max-w-6xl mx-auto">

                <div className="grid md:grid-cols-2 gap-8">

                    {/* STEP 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-bold text-blue-600 mb-3">
                            Step 1: Application
                        </h2>
                        <p className="text-gray-600">
                            Complete the online application form with accurate student details.
                        </p>
                    </div>

                    {/* STEP 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-bold text-green-600 mb-3">
                            Step 2: Document Submission
                        </h2>
                        <p className="text-gray-600">
                            Submit all required documents including birth certificate, passport photos, and previous school records on ground.
                        </p>
                    </div>

                    {/* STEP 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-bold text-purple-600 mb-3">
                            Step 3: Entrance Examination
                        </h2>
                        <p className="text-gray-600">
                            Applicants may be required to take an entrance exam to assess academic readiness.
                        </p>
                    </div>

                    {/* STEP 4 */}
                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-bold text-yellow-600 mb-3">
                            Step 4: Interview
                        </h2>
                        <p className="text-gray-600">
                            Parents and students will attend a brief interview with the admissions team.
                        </p>
                    </div>

                    {/* STEP 5 */}
                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-bold text-red-600 mb-3">
                            Step 5: Admission Decision
                        </h2>
                        <p className="text-gray-600">
                            Successful applicants will receive an admission offer.
                        </p>
                    </div>

                    {/* STEP 6 */}
                    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-bold text-indigo-600 mb-3">
                            Step 6: Enrollment
                        </h2>
                        <p className="text-gray-600">
                            Pay required fees and complete enrollment to secure your child’s place.
                        </p>
                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="bg-gray-900 text-white py-16 text-center px-6">
                <h2 className="text-3xl font-bold mb-4">
                    Start Your Application Today
                </h2>
                <p className="mb-6">
                    Secure a bright future for your child with us.
                </p>

                <Link href="/signup">
                    <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        Apply Now
                    </button>
                </Link>
            </section>

        </main>
    );
}