"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showLoginSuggestion, setShowLoginSuggestion] = useState(false);
    const [email, setEmail] = useState("");

    // ✅ VALIDATORS (MUST BE OUTSIDE handleSubmit)
    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

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

        // ✅ FINAL CHECK BEFORE SUBMIT
        if (!validateEmail(formEmail)) {
            setEmailError("Invalid email address");
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError(
                "Password must contain letter, number, symbol and 6+ characters"
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
                    middlename: e.target.middlename.value,
                    lastname: e.target.lastname.value,
                    age: e.target.age.value,
                    DOB: e.target.DOB.value,
                    email: formEmail,
                    password,
                    role: "student",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Signup failed");

                if (res.status === 409) {
                    setShowLoginSuggestion(true);
                }

                setLoading(false);
                return;
            }

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

            router.push("/studentPortal");
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

                <input name="firstname" placeholder="First Name" className="w-full border p-3 rounded-lg" required />

                <input name="middlename" placeholder="Middle Name" className="w-full border p-3 rounded-lg" />

                <input name="lastname" placeholder="Last Name" className="w-full border p-3 rounded-lg" required />

                <input name="age" type="number" placeholder="Age" className="w-full border p-3 rounded-lg" required />

                <input name="DOB" type="date" className="w-full border p-3 rounded-lg" required />

                {/* EMAIL */}
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded-lg"
                    required
                    onChange={(e) => {
                        const value = e.target.value;
                        setEmail(value);

                        if (!validateEmail(value)) {
                            setEmailError("Invalid email address");
                        } else {
                            setEmailError("");
                        }
                    }}
                />

                {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                )}

                {/* PASSWORD */}
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded-lg"
                    required
                    onChange={(e) => {
                        const value = e.target.value;

                        if (!validatePassword(value)) {
                            setPasswordError(
                                "Must contain 6+ characters, letter, number and symbol"
                            );
                        } else {
                            setPasswordError("");
                        }
                    }}
                />

                {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </button>

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                {showLoginSuggestion && (
                    <div className="bg-yellow-100 text-yellow-800 p-3 rounded text-sm text-center">
                        <p>User already exists with this email.</p>

                        <button
                            type="button"
                            onClick={() => router.push("/login")}
                            className="text-blue-600 underline"
                        >
                            Login instead
                        </button>
                    </div>
                )}
            </form>
        </main>
    );
}