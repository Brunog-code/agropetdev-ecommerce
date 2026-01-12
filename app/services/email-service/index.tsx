import nodemailer from "nodemailer";

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true só se for porta 465
  auth: {
    user: process.env.SMTP_EMAIL_USER,
    pass: process.env.SMTP_EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }: SendEmailProps) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("📨 Email enviado para:", to);
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    throw new Error("Erro ao enviar email");
  }
};
