import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/app/lib/dbconnect";
import UserModel from "@/app/models/user";
import bcrypt from "bcryptjs";

// ✅ STEP 1: Extract config
export const authOptions = {
    trustHost: true,

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                await dbConnect();

                console.log("LOGIN ATTEMPT:", credentials);

                const user = await UserModel.findOne({
                    email: credentials?.email,
                }).select("+password");

                console.log("USER FOUND:", user);

                if (!user) {
                    console.log("NO USER FOUND");
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );

                console.log("PASSWORD VALID:", isValid);

                if (!isValid) {
                    console.log("INVALID PASSWORD");
                    return null;
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt" as const,
    },

    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
};

// ✅ STEP 2: Use it in NextAuth
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };