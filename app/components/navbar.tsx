"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import LogoutButton from "../components/logoutButton";

export default function Navbar() {
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === "admin";

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    // Detect scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white shadow-md"
                    : "bg-white/70 backdrop-blur-md"
                }`}
        >

            <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
                
                <Link href="/" className="flex items-center gap-2">

                    <Image
                        src="/lizy_logo.png"
                        alt="Lizzy School Logo"
                        width={100}
                        height={60}
                        className="object-contain"
                    />

                    <span className="text-xl font-bold text-blue-600">
                        Lizzy School
                    </span>

                </Link>
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    ☰
                </button>

                <div className="hidden md:flex gap-6 text-gray-700 font-medium">

                    <Link href="/">Home</Link>

                    {/* ABOUT */}
                    <div
                        className="relative"
                        onMouseEnter={() => setOpenDropdown("about")}
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        <Link href="/about">About</Link>

                        {openDropdown === "about" && (
                            <div className="absolute top-full left-0 pt-2 bg-white shadow-md rounded-md py-2 w-48 z-50">
                                <Link href="/about/history" className="block px-4 py-2 hover:bg-gray-100">
                                    Our History
                                </Link>
                                <Link href="/about/mission" className="block px-4 py-2 hover:bg-gray-100">
                                    Mission & Vision
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ACADEMICS */}
                    <div
                        className="relative"
                        onMouseEnter={() => setOpenDropdown("academics")}
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        <Link href="/academics">Academics</Link>

                        {openDropdown === "academics" && (
                            <div className="absolute top-full left-0 pt-2 bg-white shadow-md rounded-md py-2 w-48 z-50">
                                <Link href="/academics/curriculum" className="block px-4 py-2 hover:bg-gray-100">
                                    Curriculum
                                </Link>
                                <Link href="/academics/departments" className="block px-4 py-2 hover:bg-gray-100">
                                    Departments
                                </Link>
                                <Link href="/academics/primary_school" className="block px-4 py-2 hover:bg-gray-100">
                                    Primary School
                                </Link>
                                <Link href="/academics/secondary_school" className="block px-4 py-2 hover:bg-gray-100">
                                    Secondary School
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ADMISSIONS */}
                    <div
                        className="relative"
                        onMouseEnter={() => setOpenDropdown("admissions")}
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        <Link href="/admission">Admissions</Link>

                        {openDropdown === "admissions" && (
                            <div className="absolute top-full left-0 pt-2 bg-white shadow-md rounded-md py-2 w-48 z-50">
                                <Link href="/admission/requirements" className="block px-4 py-2 hover:bg-gray-100">
                                    Requirements
                                </Link>
                                <Link href="/admission/process" className="block px-4 py-2 hover:bg-gray-100">
                                    Application Process
                                </Link>
                                <Link href="/signup/" className="block px-4 py-2 hover:bg-gray-100">
                                    Apply to Lizzy School
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href="/boarding">Boarding Program</Link>
                    {/* <Link href="/signup">Admin</Link> */}

                    {/* ================= RESOURCES ================= */}

                    {isAdmin ? (
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenDropdown("resources")}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            {/* ACTIVE LINK FOR ADMIN */}
                            <Link href="/resources">Resources</Link>

                            {openDropdown === "resources" && (
                                <div className="absolute top-full left-0 pt-2 bg-white shadow-md rounded-md py-2 w-48 z-50">

                                    <Link
                                        href="/blogAdmin"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Blog & News
                                    </Link>

                                    <Link
                                        href="/resources/calender"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Calendars and Events
                                    </Link>

                                </div>
                            )}
                        </div>
                    ) : (
                        /* ================= VISITOR VIEW ================= */
                        <span className="text-gray-400 cursor-not-allowed">
                            Resources
                        </span>
                    )}

                    <Link href="/contact">Contact</Link>

                </div>

                {/* DESKTOP BUTTONS */}

                <div className="hidden md:flex items-center gap-3">

                    {/* LOGIN */}

                    <Link href="/login">

                        <button className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition">

                            Login

                        </button>

                    </Link>

                    {/* SIGNUP */}

                    <Link href="/signup">

                        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow">

                            Sign Up

                        </button>

                    </Link>

                    <div className="px-4 py-2 justify-between items-center font-medium rounded-lg  transition">
                        <LogoutButton />
                    </div>


                </div>

            </nav>

            {/* MOBILE MENU */}

            {mobileMenu && (

                <div className="md:hidden bg-white border-t shadow-lg px-6 py-6 space-y-5">

                    <Link
                        href="/"
                        className="block font-medium"
                        onClick={() => setMobileMenu(false)}
                    >
                        Home
                    </Link>

                    <Link
                        href="/about"
                        className="block font-medium"
                        onClick={() => setMobileMenu(false)}
                    >
                        About
                    </Link>

                    <Link
                        href="/academics"
                        className="block font-medium"
                        onClick={() => setMobileMenu(false)}
                    >
                        Academics
                    </Link>

                    <Link
                        href="/admission"
                        className="block font-medium"
                        onClick={() => setMobileMenu(false)}
                    >
                        Admissions
                    </Link>

                    <Link
                        href="/boarding"
                        className="block font-medium"
                        onClick={() => setMobileMenu(false)}
                    >
                        Boarding Program
                    </Link>

                    <Link
                        href="/contact"
                        className="block font-medium"
                        onClick={() => setMobileMenu(false)}
                    >
                        Contact
                    </Link>

                    {/* ADMIN ONLY */}

                    {isAdmin && (

                        <>

                            <Link
                                href="/resources"
                                className="block font-medium"
                                onClick={() => setMobileMenu(false)}
                            >
                                Resources
                            </Link>

                            <Link
                                href="/blogAdmin"
                                className="block font-medium"
                                onClick={() => setMobileMenu(false)}
                            >
                                Blog Admin
                            </Link>

                        </>

                    )}

                    {/* MOBILE BUTTONS */}

                    <div className="flex flex-col gap-3 pt-4">

                        <Link href="/login">

                            <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-medium">

                                Login

                            </button>

                        </Link>

                        <Link href="/signup">

                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">

                                Sign Up

                            </button>

                        </Link>

                        <div className="w-full justify-between items-center font-medium rounded-lg  transition">
                            <LogoutButton />
                        </div>

                    </div>

                </div>

            )}

        </header>
    );
}