"use client";

import Link from "next/link";
import Image from "next/image";

export default function BoardingPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="relative h-[70vh] flex items-center justify-center text-center text-white">

                <Image
                    src="/images/boarding.jpg"
                    alt="Boarding school"
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Boarding School Program
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg">
                        A safe, structured, and nurturing environment where students live, learn, and grow.
                    </p>
                </div>
            </section>

            {/* ABOUT BOARDING */}
            <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                <div>
                    <h2 className="text-3xl font-bold mb-4">
                        Life in Our Boarding House
                    </h2>

                    <p className="text-gray-600 mb-4">
                        Our boarding facility provides students with a home away from home.
                        We ensure comfort, discipline, and academic excellence in a safe environment
                        supervised by experienced house parents and staff.
                    </p>

                    <p className="text-gray-600">
                        Students develop independence, responsibility, and strong social values while
                        maintaining a structured daily routine that supports learning and personal growth.
                    </p>
                </div>

                <div className="relative h-80 w-full">
                    <Image
                        src="/images/boarding.jpg"
                        alt="Dormitory"
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>

            </section>

            {/* FEATURES */}
            <section className="bg-white py-16 px-6">

                <h2 className="text-3xl font-bold text-center mb-12">
                    Boarding Facilities
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2 text-blue-600">
                            Comfortable Accommodation
                        </h3>
                        <p className="text-gray-600">
                            Spacious, well-furnished dormitories with proper ventilation and security.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2 text-green-600">
                            Balanced Meals
                        </h3>
                        <p className="text-gray-600">
                            Nutritious meals prepared daily to support healthy growth and learning.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2 text-purple-600">
                            24/7 Supervision
                        </h3>
                        <p className="text-gray-600">
                            Dedicated staff ensuring safety, discipline, and student wellbeing.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2 text-yellow-600">
                            Study Hours
                        </h3>
                        <p className="text-gray-600">
                            Structured evening study sessions with academic support.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2 text-red-600">
                            Recreation
                        </h3>
                        <p className="text-gray-600">
                            Sports, games, and entertainment activities for relaxation and balance.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="font-semibold text-xl mb-2 text-indigo-600">
                            Medical Care
                        </h3>
                        <p className="text-gray-600">
                            On-campus health support and quick access to medical attention.
                        </p>
                    </div>

                </div>
            </section>

            {/* DAILY ROUTINE */}
            <section className="py-16 px-6 max-w-4xl mx-auto">

                <h2 className="text-3xl font-bold text-center mb-10">
                    Daily Routine
                </h2>

                <div className="space-y-4">

                    <div className="flex justify-between bg-white p-4 rounded shadow">
                        <span>6:00 AM</span>
                        <span>Morning Prep & Devotion</span>
                    </div>

                    <div className="flex justify-between bg-white p-4 rounded shadow">
                        <span>7:00 AM</span>
                        <span>Breakfast</span>
                    </div>

                    <div className="flex justify-between bg-white p-4 rounded shadow">
                        <span>8:00 AM - 2:00 PM</span>
                        <span>Classes</span>
                    </div>

                    <div className="flex justify-between bg-white p-4 rounded shadow">
                        <span>3:00 PM</span>
                        <span>Lunch & Rest</span>
                    </div>

                    <div className="flex justify-between bg-white p-4 rounded shadow">
                        <span>4:00 PM - 6:00 PM</span>
                        <span>Prep / Study Time</span>
                    </div>

                    <div className="flex justify-between bg-white p-4 rounded shadow">
                        <span>7:00 PM</span>
                        <span>Dinner</span>
                    </div>

                    <div className="flex justify-between bg-white p-4 rounded shadow">
                        <span>8:00 PM</span>
                        <span>Evening Study</span>
                    </div>

                    <div className="flex justify-between bg-white p-4 rounded shadow">
                        <span>10:00 PM</span>
                        <span>Lights Out</span>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-600 text-white py-16 text-center px-6">

                <h2 className="text-3xl font-bold mb-4">
                    Interested in Boarding Admission?
                </h2>

                <p className="mb-6">
                    Give your child a structured and secure learning environment.
                </p>

                <Link href="/admission/process">
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        View Admission Process
                    </button>
                </Link>

            </section>

        </main>
    );
}