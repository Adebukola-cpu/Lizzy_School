import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendMail = async ({ to, subject, html }: any) => {
    const info = await transporter.sendMail({
        from: `"School Admin" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });

    console.log("EMAIL SENT:", info.messageId);
};

// export const sendMail = async ({
//     to,
//     subject,
//     html,
// }: {
//     to: string;
//     subject: string;
//     html: string;
// }) => {
//     try {
//         await transporter.sendMail({
//             from: `"School Admin" <${process.env.EMAIL_USER}>`,
//             to,
//             subject,
//             html,
//         });
//     } catch (error) {
//         console.error("Email error:", error);
//     }
// };