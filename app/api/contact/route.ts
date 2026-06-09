import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstname,
      lastname,
      email,
      phone,
      interest,
      portfolio,
      goal,
      preferredContact,
      message,
      riskAck,
    } = body;

    if (!firstname || !interest || !portfolio || !goal || !message || !preferredContact) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const usesEmail = String(preferredContact).toLowerCase().includes("email");

    if (usesEmail && !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required when Email is your preferred contact.",
        },
        { status: 400 }
      );
    }

    if (!usesEmail && !phone) {
      return NextResponse.json(
        {
          success: false,
          message: `Phone is required when ${preferredContact} is your preferred contact.`,
        },
        { status: 400 }
      );
    }

    if (!riskAck) {
      return NextResponse.json(
        {
          success: false,
          message: "Please acknowledge the risk disclaimer to proceed.",
        },
        { status: 400 }
      );
    }

    const name = `${firstname} ${lastname || ""}`.trim();

    const sent = await sendEmail({
      name,
      email,
      phone: phone || "",
      interest,
      portfolio,
      goal,
      preferredContact: preferredContact || "",
      message,
    });

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
