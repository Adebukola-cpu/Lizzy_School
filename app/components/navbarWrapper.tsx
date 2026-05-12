"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarWrapper() {

    const pathname = usePathname();

    const hiddenRoutes = [
        "/adminDashboard",
        "/studentPortal",
        "/resources",
    ];

    const shouldHide = hiddenRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (shouldHide) {
        return null;
    }

    return <Navbar />;
}