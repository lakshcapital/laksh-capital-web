import nodemailer from "nodemailer";
import { contactTemplate } from "@/template/contact";

const config = {
  service: process.env.EMAIL_SERVICE || "gmail",
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  user: process.env.EMAIL_USER || "",
  pass: process.env.EMAIL_PASS || "",
  from: {
    name: process.env.EMAIL_FROM_NAME || "Laksh Capital Contact",
    address: process.env.EMAIL_FROM_ADDRESS || "",
  },
  to: process.env.EMAIL_TO || "",
  subject: "Laksh Capital - Contact Form Received",
  htmlTemplate: contactTemplate,
};

const transporter = nodemailer.createTransport({
  service: config.service,
  host: config.host,
  auth: {
    user: config.user,
    pass: config.pass,
  },
});

export async function sendEmail(
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<boolean> {
  try {
    const mailOptions = {
      from: config.from,
      to: config.to,
      subject: config.subject,
      html: config.htmlTemplate
        .replace("{{name}}", name)
        .replace("{{email}}", email)
        .replace("{{subject}}", subject)
        .replace("{{message}}", message)
        .replace("{{date}}", new Date().toLocaleString()),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully with message id: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email with error:", error);
    return false;
  }
}
