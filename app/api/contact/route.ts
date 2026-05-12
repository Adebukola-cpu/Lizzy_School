// import { sendMail, transporter } from "@/app/lib/nodemailer";

// export async function POST(req: Request) {
//     const body = await req.json();

//     const { name, email, subject, message } = body;

//     // send confirmation to user
//     await transporter.sendMail({
//         from: `"MySchool" <${process.env.EMAIL_USER}>`,
//         to,
//         subject,
//         text: "Thank you for contacting us. We received your message.",
//         html: `
//         <div style="font-family:Arial;padding:20px">
//             <h2>Hello ${name || ""} 👋</h2>
//             <p>Thank you for contacting us.</p>
//             <p>We have received your message and will respond shortly.</p>

//             <hr/>

//             <p style="font-size:12px;color:gray;">
//                 If you did not send this message, please ignore this email.
//             </p>
//         </div>
//     `,
//     });
// }


import { transporter } from "@/app/lib/nodemailer";

export async function POST(req: Request) {
    try {
        // ✅ GET DATA FROM FRONTEND
        const { name, email, subject, message } = await req.json();

        // ✅ VALIDATION
        if (!name || !email || !subject || !message) {
            return Response.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // ================= ADMIN EMAIL =================
        await transporter.sendMail({
            from: `"MySchool" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // 👉 YOU receive it
            subject: `New Message: ${subject}`,
            html: `
                <div style="font-family:Arial;padding:20px">
                    <h2>New Contact Message</h2>
                    <p><b>Name:</b> ${name}</p>
                    <p><b>Email:</b> ${email}</p>
                    <p><b>Subject:</b> ${subject}</p>
                    <p><b>Message:</b></p>
                    <p>${message}</p>
                </div>
            `,
        });

        // ================= USER CONFIRMATION =================
        await transporter.sendMail({
            from: `"LizzySchool" <${process.env.EMAIL_USER}>`,
            to: email, // 👉 USER receives confirmation
            subject: "We received your message ✅",
            html: `html
        <div style="background:#f4f7fb;padding:40px 20px;font-family:Arial,sans-serif;">
    
        <div style="max-width:600px;margin:auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        
        <!-- HEADER -->
        <div style="background:linear-gradient(135deg,#2563eb,#4f46e5);padding:30px;text-align:center;color:white;">
            <h1 style="margin:0;font-size:28px;">LizzySchool</h1>
            <p style="margin-top:8px;font-size:14px;opacity:0.9;">
                Contact Confirmation
            </p>
        </div>

        <!-- BODY -->
        <div style="padding:40px 30px;color:#374151;line-height:1.7;">
            
            <h2 style="margin-top:0;color:#111827;">
                Hello ${name} 👋
            </h2>

            <p>
                Thank you for contacting us. We have successfully received your message.
            </p>

            <p>
                Our team will review your enquiry and get back to you as soon as possible.
            </p>

            <!-- MESSAGE BOX -->
            <div style="margin:30px 0;padding:20px;background:#f9fafb;border-left:4px solid #2563eb;border-radius:10px;">
                <p style="margin:0;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin-top:10px;"><strong>Your Message:</strong></p>
                <p style="margin:0;color:#4b5563;">
                    ${message}
                </p>
            </div>

            <p>
                We appreciate your patience and look forward to assisting you.
            </p>

            <br/>

            <p style="margin-bottom:0;">
                Best regards,
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

        });

        return Response.json(
            { message: "Message sent successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("CONTACT ERROR:", error);

        return Response.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}