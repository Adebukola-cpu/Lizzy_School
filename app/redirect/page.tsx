// // import { getServerSession } from "next-auth";
// // import { redirect } from "next/navigation";
// // import { authOptions } from "../api/auth/[...nextauth]/route";

// // // export default async function RedirectPage() {
// // //     const session = await getServerSession(authOptions);

// // //     if (!session) {
// // //         redirect("/login");
// // //     }

// // //     // ✅ Role-based redirect
// // //     if (session.user.role === "admin") {
// // //         redirect("/adminDashboard");
// // //     } else if (session.user.role === "resource") {
// // //         redirect("/resources");
// // //     } else {
// // //         redirect("/studentPortal");
// // //     }
// // // }

// // export default async function RedirectPage() {
// //     const session = await getServerSession(authOptions);

// //     if (!session?.user?.role) {
// //         redirect("/login");
// //     }

// //     const role = session.user.role;

// //     if (role === "admin") {
// //         redirect("/adminDashboard");
// //     }

// //     if (role === "student") {
// //         redirect("/studentPortal");
// //     }

// //     if (role === "resource") {
// //         redirect("/resources");
// //     }

// //     redirect("/login");
// // }

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// export default function RedirectPage() {
//     const router = useRouter();

//     const { data: session, status } = useSession();

//     useEffect(() => {
//         console.log("SESSION:", session);
//         console.log("STATUS:", status);

//         if (status === "loading") return;

//         if (!session) {
//             router.push("/login");
//             return;
//         }

//         const role = session.user?.role;

//         if (role === "admin") {
//             router.push("/adminDashboard");
//         } else if (role === "student") {
//             router.push("/studentPortal");
//         } else if (role === "resource") {
//             router.push("/resources");
//         } else {
//             router.push("/login");
//         }
//     }, [session, status, router]);

//     return (
//         <div className="p-10 text-center">
//             Redirecting...
//         </div>
//     );
// }