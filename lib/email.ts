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
  subject: "Laksh Capital — New website enquiry",
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

interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  interest: string;
  portfolio: string;
  goal: string;
  preferredContact: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendEmail(payload: EnquiryPayload): Promise<boolean> {
  try {
    const fields: Record<string, string> = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone || "—",
      interest: payload.interest,
      portfolio: payload.portfolio,
      goal: payload.goal,
      preferredContact: payload.preferredContact || "—",
      message: payload.message,
      date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    let html = config.htmlTemplate;
    for (const [key, value] of Object.entries(fields)) {
      html = html.replaceAll(`{{${key}}}`, escapeHtml(value));
    }

    const mailOptions = {
      from: config.from,
      to: config.to,
      subject: config.subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully with message id: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email with error:", error);
    return false;
  }
}
