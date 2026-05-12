export default function AboutPage() {
    return (
        <main className="max-w-6xl mx-auto px-6 py-16">

            {/* HERO */}
            <section className="text-center mb-16">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">
                    About Our School
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We are committed to excellence in education, shaping students
                    into future leaders through discipline, innovation, and integrity.
                </p>
            </section>

            {/* GRID */}
            <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6">

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


                {/* <div className="p-6 bg-white shadow rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Our Values</h2>
                    <p className="text-gray-600">
                        Discipline, Excellence, Integrity, and Innovation.
                    </p>
                </div> */}

            </section>

            <section className="bg-gray-100 py-16 px-6">
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
            </section>

        </main>
    );
}