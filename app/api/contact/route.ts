import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    const sent = await sendEmail(name, email, subject, message);
    if (sent) {
      return NextResponse.json({
        success: true,
        message: "Email sent successfully",
      });
    }
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
