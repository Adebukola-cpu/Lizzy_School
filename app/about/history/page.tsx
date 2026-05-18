import Image from "next/image";

export default function HistoryPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="relative h-[40vh] flex items-center justify-center text-center text-white">
                {/* <section className="bg-blue-600 text-white py-20 px-6 text-center"> */}
                 <Image
                                    src="/images/history.jpg"
                                    alt="History"
                                    fill
                                    className="object-cover"
                                />
                <div className="relative z-10 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Our History
                    </h1>
                    <p className="mt-3 text-gray-200 max-w-xl mx-auto">
                        Building a legacy of excellence, discipline, and innovation in education.
                    </p>
                </div>
            </section>

            {/* HISTORY TEXT */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <div className="bg-white p-8 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold mb-4 text-blue-600">
                        About Lizzy School
                        
                    </h2>

                    <p className="text-gray-600 leading-relaxed">
                        Lizzy School was established in 2005 with a strong commitment to raising a new generation
                        of students equipped with knowledge, discipline, and strong moral values.
                        The school began as a small learning initiative driven by the belief that
                        quality education should be accessible, structured, and impactful.
                        <br /><br />

                        In its early days, Lizzy School operated with a modest number of students and a
                        dedicated team of educators. Despite limited resources, the focus remained
                        on academic excellence and character building.
                        <br /><br />

                        Over time, the school expanded its academic programs, improved facilities,
                        and embraced modern teaching methods and technology to enhance learning.
                        Today, MySchool stands as a growing institution committed to shaping future leaders.
                    </p>
                </div>
            </section>

            {/* MISSION / VISION */}
            {/* <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6">

                <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-blue-600 mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                        To provide high-quality, holistic education that develops students academically,
                        morally, and socially, preparing them for leadership and lifelong success.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold text-blue-600 mb-2">Our Vision</h3>
                    <p className="text-gray-600">
                        To become a leading educational institution recognized for excellence,
                        innovation, and the development of well-rounded individuals who positively
                        impact society.
                    </p>
                </div>

            </section> */}

            {/* CORE VALUES */}
            {/* <section className="bg-gray-100 py-16 px-6">
                <h2 className="text-center text-3xl font-bold mb-10">
                    Core Values
                </h2>

                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

                    {[
                        { title: "Excellence", desc: "We strive for the highest standards in education." },
                        { title: "Discipline", desc: "We promote responsibility and self-control." },
                        { title: "Integrity", desc: "We uphold honesty and strong moral values." },
                        { title: "Innovation", desc: "We embrace modern learning methods." },
                        { title: "Respect", desc: "We value every student and staff member." },
                        { title: "Commitment", desc: "We are dedicated to student success." },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow">
                            <h3 className="font-bold text-blue-600 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {item.desc}
                            </p>
                        </div>
                    ))}

                </div>
            </section> */}

            {/* TIMELINE */}
            <section className="max-w-5xl mx-auto px-6 py-16">

                <h2 className="text-3xl font-bold text-center mb-10">
                    Our Journey
                </h2>

                <div className="space-y-6 border-l-4 border-blue-600 pl-6">

                    <div>
                        <h3 className="font-bold text-blue-600">Founding Year</h3>
                        <p className="text-gray-600">
                            MySchool was established as a small learning center with a vision for quality education.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-blue-600">Early Growth</h3>
                        <p className="text-gray-600">
                            Student enrollment increased and academic programs expanded.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-blue-600">Expansion Phase</h3>
                        <p className="text-gray-600">
                            New facilities were built and more qualified teachers joined the school.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-blue-600">Modern Learning Era</h3>
                        <p className="text-gray-600">
                            Technology and digital learning tools were introduced into classrooms.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-blue-600">Today</h3>
                        <p className="text-gray-600">
                            MySchool continues to grow as a respected institution focused on excellence.
                        </p>
                    </div>

                </div>
            </section>

        </main>
    );
}