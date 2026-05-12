"use client";

import { useState } from "react";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to send message");
            }

            setSuccess("Message sent successfully!");
            e.target.reset();

        } catch (err: any) {
            console.error(err);
            setSuccess("");
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">

            {/* HERO */}
            <section className="bg-blue-600 text-white py-20 text-center px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Contact Us
                </h1>
                <p className="max-w-2xl mx-auto text-lg">
                    We are always here to help. Reach out to us anytime.
                </p>
            </section>

            {/* CONTENT */}
            <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

                {/* CONTACT INFO */}
                <div className="space-y-6">

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold text-blue-600 mb-2">
                            School Address
                        </h2>
                        <p className="text-gray-600">
                            3 Isokan street, Bovas filling station, Ogooluwa, Osogbo, Osun State
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold text-green-600 mb-2">
                            Phone
                        </h2>
                        <p className="text-gray-600">
                            +234 8088033643
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold text-purple-600 mb-2">
                            Email
                        </h2>
                        <p className="text-gray-600">
                            info@myschool.com
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-bold text-red-600 mb-2">
                            Office Hours
                        </h2>
                        <p className="text-gray-600">
                            Monday - Friday: 8:00 AM - 4:00 PM
                        </p>
                    </div>

                </div>

                {/* CONTACT FORM */}
                <div className="bg-white p-8 rounded-2xl shadow">

                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Send Us a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            name="name"
                            placeholder="Your Name"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />

                        <input
                            name="email"
                            type="email"
                            placeholder="Your Email"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />

                        <input
                            name="subject"
                            placeholder="Subject"
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows={5}
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                        {success && (
                            <p className="text-green-600 text-sm text-center">
                                {success}
                            </p>
                        )}

                    </form>

                </div>

            </section>

            {/* MAP SECTION (OPTIONAL) */}
            <section className="px-6 pb-16 max-w-6xl mx-auto">
                <div className="w-full h-80 rounded-2xl overflow-hidden shadow">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18..."
                        className="w-full h-full"
                        loading="lazy"
                    ></iframe>
                </div>
            </section>

        </main>
    );
}