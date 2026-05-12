import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* ================= HERO ================= */}
            <section className="relative h-[40vh] flex items-center justify-center text-center text-white">
                <Image
                src="/images/classroom.jpg"
                alt="History"
                fill
                className="object-cover"
                 />
                <div className="relative z-10 px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    About Our School
                </h1>
                <p className="max-w-2xl mx-auto text-lg">
                    Raising future leaders through excellence, discipline, and innovation.
                </p>
                </div>
            </section>

            {/* ================= INTRO ================= */}
            <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                <div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">
                        Who We Are
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Our school is committed to providing quality education that nurtures
                        intellectual growth, character development, and lifelong learning.
                    </p>
                    <p className="text-gray-600">
                        We combine academic excellence with strong moral values to prepare
                        students for success in a rapidly changing world.
                    </p>
                </div>

                <div className="relative h-80 w-full">
                    <Image
                        src="/images/schoolbuilding.jpg"
                        alt="School Building"
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>

            </section>

            
          

            {/* ================= CTA ================= */}
            <section className="py-20 text-center bg-blue-600 text-white">
                <h2 className="text-3xl font-bold mb-4">
                    Join Our School Community
                </h2>
                <p className="mb-6">
                    Give your child the best foundation for success.
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