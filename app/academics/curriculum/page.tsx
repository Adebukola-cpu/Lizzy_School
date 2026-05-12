import Image from "next/image";

export default function CurriculumPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="relative h-[40vh] flex items-center justify-center text-center text-white">

                <Image
                    src="/images/curriculum.jpg"
                    alt="Curriculum"
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Our Curriculum
                    </h1>
                    <p className="mt-3 text-gray-200 max-w-xl mx-auto">
                        A balanced academic system designed to build excellence, discipline,
                        and global competence.
                    </p>
                </div>
            </section>

            {/* INTRO */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Academic Structure
                </h2>

                <p className="text-gray-600 leading-relaxed">
                    Our school follows a structured curriculum that blends academic excellence,
                    moral values, creativity, and practical learning. We ensure students are
                    well-prepared for national and international examinations, while also
                    developing critical thinking and leadership skills.
                </p>
            </section>

            {/* PRIMARY */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                    <div>
                        <h2 className="text-3xl font-bold text-blue-600 mb-4">
                            Primary School Curriculum
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Our primary curriculum builds a strong foundation in literacy,
                            numeracy, and character development.
                        </p>

                        <ul className="space-y-3 text-gray-700">
                            <li>📘 English Language & Phonics</li>
                            <li>➗ Mathematics</li>
                            <li>🌍 Basic Science & Technology</li>
                            <li>📖 Social Studies</li>
                            <li>✝️ Civic Education & Moral Instruction</li>
                            <li>🎨 Creative Arts</li>
                            <li>💻 Basic Computer Studies</li>
                            <li>🏃 Physical & Health Education</li>
                        </ul>
                    </div>

                    <div className="relative h-80 w-full">
                        <Image
                            src="/images/primary2.jpg"
                            alt="Primary School"
                            fill
                            className="object-cover rounded-2xl"
                        />
                    </div>

                </div>
            </section>

            {/* SECONDARY */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                    <div className="relative h-80 w-full order-2 md:order-1">
                        <Image
                            src="/images/secondary.webp"
                            alt="Secondary School"
                            fill
                            className="object-cover rounded-2xl"
                        />
                    </div>

                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold text-green-600 mb-4">
                            Secondary School Curriculum
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Our secondary curriculum prepares students for WAEC, NECO,
                            and international examinations with a strong academic and practical base.
                        </p>

                        <ul className="space-y-3 text-gray-700">
                            <li>📘 English Language & Literature</li>
                            <li>➗ Mathematics (Core & Further Math)</li>
                            <li>🔬 Physics, Chemistry & Biology</li>
                            <li>🌍 Geography & Economics</li>
                            <li>📖 Government & Civic Education</li>
                            <li>💻 Computer Science / ICT</li>
                            <li>📊 Accounting & Business Studies</li>
                            <li>🎨 Fine Arts & Creative Design</li>
                        </ul>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-600 text-white text-center py-16 px-6">
                <h2 className="text-3xl font-bold mb-3">
                    Shaping Future Leaders
                </h2>

                <p className="mb-6 text-white/90">
                    Our curriculum is designed to unlock every child’s potential.
                </p>

                <a
                    href="/signup"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                    Apply Now
                </a>
            </section>

        </main>
    );
}