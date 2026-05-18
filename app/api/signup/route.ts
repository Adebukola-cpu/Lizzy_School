import { dbConnect } from "@/app/lib/dbconnect";
import UserModel from "@/app/models/user";
import bcrypt from "bcryptjs";
import { sendMail } from "@/app/lib/nodemailer";

export async function POST(req: Request) {

    await dbConnect();

    const {
        firstname,
        middlename,
        lastname,
        age,
        DOB,
        email,
        password,
        role,
    } = await req.json();

    // check if user exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        return Response.json(
            { message: "User already exists" },
            { status: 409 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        firstname,
        middlename,
        lastname,
        age,
        DOB,
        email,
        password: hashedPassword,
        role,
    });

    // 📧 SEND EMAIL
    await sendMail({
        to: email,
        subject: "Welcome to Lizzy School 🎓",
        html: `html
        <div style="background:#eef2ff;padding:40px 20px;font-family:Arial,sans-serif;">

        <div style="max-width:620px;margin:auto;background:white;border-radius:18px;overflow:hidden;box-shadow:0 5px 25px rgba(0,0,0,0.08);">

        <!-- HEADER -->
        <div style="background:linear-gradient(135deg,#2563eb,#4f46e5);padding:40px;text-align:center;color:white;">
            
            <h1 style="margin:0;font-size:32px;">
                Welcome to LizzySchool 🎓
            </h1>

            <p style="margin-top:12px;font-size:15px;opacity:0.9;">
                Your learning journey starts here
            </p>

        </div>

        <!-- BODY -->
        <div style="padding:45px 35px;color:#374151;line-height:1.8;">

            <h2 style="margin-top:0;color:#111827;">
                Hello ${firstname},
            </h2>

            <p>
                Thank you for registering at <strong>Lizzy School Portal</strong>.
            </p>

            <p>
                Your account has been successfully created and you can now access:
            </p>

            <ul style="padding-left:20px;color:#4b5563;">
                <li>Learning Resources</li>
                <li>Student Dashboard</li>
                <li>Academic Materials</li>
                <li>School Notifications</li>
            </ul>

            <!-- LOGIN BOX -->
            <div style="margin:35px 0;padding:25px;background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;">
                
                <p style="margin-top:0;">
                    <strong>Registered Email:</strong>
                </p>

                <p style="font-size:16px;color:#2563eb;">
                    ${email}
                </p>

            </div>

            <!-- BUTTON -->
            <div style="text-align:center;margin:40px 0;">

                <a 
                    href="https://lizzy-school-s4qa.vercel.app/login"
                    style="
                        display:inline-block;
                        background:#2563eb;
                        color:white;
                        padding:14px 32px;
                        text-decoration:none;
                        border-radius:10px;
                        font-weight:bold;
                        font-size:15px;
                    "
                >
                    Login to Portal
                </a>

            </div>

            <p>
                We are excited to have you as part of our school community.
            </p>

            <br/>

            <p style="margin-bottom:0;">
                Regards,
            </p>

            <h3 style="margin-top:5px;color:#2563eb;">
                LizzySchool Team
            </h3>

        </div>

        <!-- FOOTER -->
        <div style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#6b7280;">
            © 2026 LizzySchool. All rights reserved.
        </div>

    </div>

</div>
`
,
    });
    console.log("Signup email sent to:", email);

    return Response.json(
        {
            message: "User created successfully",
            userId: user._id,
            email: user.email,
        },
        { status: 201 }
    );
}

