import nodemailer from "nodemailer";

export async function sendEmail(to, subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", // you can also use SMTP
            auth: {
                user: process.env.EMAIL_USER, // your gmail
                pass: process.env.EMAIL_PASS, // app password
            },
        });

        await transporter.sendMail({
            from: `"Expense Management" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });

        console.log("Email sent successfully!");
    } catch (err) {
        console.error("Error sending email:", err);
    }
}
