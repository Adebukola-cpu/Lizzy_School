"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showLoginSuggestion, setShowLoginSuggestion] = useState(false);
    const [email, setEmail] = useState("");

    const validatePassword = (password: string) => {
        const minLength = password.length >= 6;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return minLength && hasLetter && hasNumber && hasSymbol;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setShowLoginSuggestion(false);

        const formEmail = e.target.email.value;
        const password = e.target.password.value;

        setEmail(formEmail);

        // ✅ PASSWORD VALIDATION FIRST
        if (!validatePassword(password)) {
            setError(
                "Password must be at least 6 characters and include a letter, number, and symbol."
            );
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstname: e.target.firstname.value,
                    lastname: e.target.lastname.value,
                    email: formEmail,
                    password,
                    role: "student",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Signup failed");

                // 👇 user already exists case
                if (res.status === 409) {
                    setShowLoginSuggestion(true);
                }

                setLoading(false);
                return;
            }

            // 🔥 AUTO LOGIN
            const login = await signIn("credentials", {
                redirect: false,
                email: formEmail,
                password,
            });

            if (!login?.ok) {
                setError("Login failed");
                setLoading(false);
                return;
            }

            router.push("/registerStudents");

        } catch (err) {
            setError("Something went wrong. Try again.");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-5"
            >

                <h1 className="text-2xl font-bold text-center text-blue-600">
                    Create Account
                </h1>

                {/* First Name */}
                <input
                    name="firstname"
                    placeholder="First Name"
                    className="w-full border p-3 rounded-lg"
                    required
                />

                {/* Last Name */}
                <input
                    name="lastname"
                    placeholder="Last Name"
                    className="w-full border p-3 rounded-lg"
                    required
                />

                {/* Email */}
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded-lg"
                    required
                />

                {/* Password */}
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded-lg"
                    required
                />

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </button>

                {/* ❌ ERROR MESSAGE */}
                {error && (
                    <p className="text-red-500 text-sm text-center">
                        {error}
                    </p>
                )}

                {/* 🔥 LOGIN SUGGESTION */}
                {showLoginSuggestion && (
                    <div className="bg-yellow-100 text-yellow-800 p-3 rounded text-sm text-center space-y-2">
                        <p>User already exists with this email.</p>

                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="text-blue-600 underline"
                        >
                            Login instead
                        </button>

                        <button
                            type="button"
                            onClick={async () => {
                                const login = await signIn("credentials", {
                                    redirect: false,
                                    email,
                                    password: "",
                                });

                                router.push("/login");
                            }}
                            className="block text-green-600 underline"
                        >
                            Try auto-login
                        </button>
                    </div>
                )}

                {/* Footer */}
                <p className="text-sm text-center text-gray-500">
                    Already have an account?{" "}
                    <span
                        onClick={() => router.push("/login")}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>

            </form>
        </main>
    );
}