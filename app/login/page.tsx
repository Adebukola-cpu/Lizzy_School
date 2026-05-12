"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const res = await signIn("credentials", {
            email: e.target.email.value,
            password: e.target.password.value,
            redirect: false,
        });

        if (res?.error) {
            alert("Invalid email or password");
            setLoading(false);
            return;
        }
        // router.push("/redirect");

        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();

        console.log("SESSION:", session);

        const role = session?.user?.role;

        if (role === "admin") {
            window.location.href = "/adminDashboard";
        } else {
            window.location.href = "/studentPortal";
        }
    };
   
    

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-5"
            >
                <h1 className="text-2xl font-bold text-center text-blue-600">
                    Welcome Back
                </h1>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm text-center text-gray-500">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => router.push("/signup")}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Sign up
                    </span>
                </p>
            </form>
        </main>
    );
}