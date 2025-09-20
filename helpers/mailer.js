import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: process.env.UKRNET_USER,
        pass: process.env.UKRNET_PASS,
    },
});

export const sendMail = async ({ to, subject, html }) => {
    await transporter.sendMail({
        from: `"Support" <${process.env.UKRNET_USER}>`,
        to,
        subject,
        html,
    });
};
