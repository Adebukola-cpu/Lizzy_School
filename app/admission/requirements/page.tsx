import Image from "next/image";
import Link from "next/link";

export default function RequirementsPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="relative h-[40vh] flex items-center justify-center text-center text-white">
                <Image
                    src="/images/commercial.jpg"
                    alt="Academics"
                    fill
                    className="object-cover"
                />
                <div className="relative z-10 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Admission Requirements
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg">
                        Everything you need to enroll your child into our school.
                    </p>
                </div>
            </section>

            {/* REQUIREMENTS CONTENT */}
            <section className="py-16 px-6 max-w-6xl mx-auto space-y-12">

                {/* GENERAL REQUIREMENTS */}
                <div className="bg-white p-8 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold mb-4 text-blue-600">
                        General Requirements
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Completed application form</li>
                        <li>Birth certificate (original & copy)</li>
                        <li>Passport photographs (2 copies)</li>
                        <li>Medical fitness report</li>
                        <li>Previous school records/report cards</li>
                    </ul>
                </div>

                {/* PRIMARY SCHOOL */}
                <div className="bg-white p-8 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold mb-4 text-green-600">
                        Primary School Admission
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Minimum age requirement for entry class is 2 years old</li>
                        <li>Basic literacy and numeracy assessment</li>
                        <li>Interview with parents/guardians</li>
                    </ul>
                </div>

                {/* SECONDARY SCHOOL */}
                <div className="bg-white p-8 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold mb-4 text-purple-600">
                        Secondary School Admission
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Entrance examination (Mathematics & English)</li>
                        <li>Previous academic results</li>
                        <li>Transfer certificate (if applicable)</li>
                        <li>Oral interview</li>
                    </ul>
                </div>

                {/* BOARDING REQUIREMENTS */}
                <div className="bg-white p-8 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold mb-4 text-red-600">
                        Boarding Requirements
                    </h2>

                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Personal belongings checklist (provided upon admission)</li>
                        <li>Medical clearance</li>
                        <li>Parental consent form</li>
                    </ul>
                </div>

                {/* ADMISSION PROCESS */}
                <div className="bg-white p-8 rounded-2xl shadow">
                    <h2 className="text-2xl font-bold mb-4 text-yellow-600">
                        Admission Process
                    </h2>

                    <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                        <li>Fill out the online application form</li>
                        <li>Submit required documents</li>
                        <li>Take entrance examination (if applicable)</li>
                        <li>Attend interview</li>
                        <li>Receive admission decision</li>
                    </ol>
                </div>

            </section>

            {/* CTA */}
            <section className="bg-gray-900 text-white py-16 text-center px-6">
                <h2 className="text-3xl font-bold mb-4">
                    Ready to Apply?
                </h2>
                <p className="mb-6">
                    Begin your child’s journey with us today.
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