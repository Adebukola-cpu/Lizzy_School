export interface userForm {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    DOB: Date;
    email: string;
    password: string;
};

import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            email: string;
        };
    }

    interface User {
        id: string;
        role: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
    }
}

