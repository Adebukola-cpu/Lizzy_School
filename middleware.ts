
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req: any) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const pathname = req.nextUrl.pathname;

    // PUBLIC ROUTES
    if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/api/auth")
    ) {
        return NextResponse.next();
    }

    // MUST LOGIN
    if (!token) {
        return NextResponse.redirect(
            new URL("/login", req.url)
        );
    }

    // ADMIN ONLY
    if (
        pathname.startsWith("/adminDashboard") &&
        token.role !== "admin"
    ) {
        return NextResponse.redirect(
            new URL("/unauthorized", req.url)
        );
    }

    // STUDENT ONLY
    if (
        pathname.startsWith("/studentPortal") &&
        token.role !== "student"
    ) {
        return NextResponse.redirect(
            new URL("/unauthorized", req.url)
        );
    }

    // RESOURCES
    // BOTH admin + student allowed
    if (
        pathname.startsWith("/resources") &&
        !["admin", "student"].includes(token.role)
    ) {
        return NextResponse.redirect(
            new URL("/unauthorized", req.url)
        );
    }

    if (
        pathname.startsWith("/blogAdmin") &&
        !["admin"].includes(token.role)
    ) {
        return NextResponse.redirect(
            new URL("/unauthorized", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/adminDashboard/:path*",
        "/studentPortal/:path*",
        "/resources/:path*",
        "/blogAdmin/:path*",
    ],
};