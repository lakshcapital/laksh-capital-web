import { NextResponse } from "next/server";
import { serverClient } from "@/sanity/server-client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email." },
        { status: 400 }
      );
    }

    const normalized = email.trim().toLowerCase();

    const existing = await serverClient.fetch(
      `*[_type == "newsletterSubscriber" && email == $e][0]._id`,
      { e: normalized }
    );
    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You're already on the list. Thank you.",
      });
    }

    await serverClient.create({
      _type: "newsletterSubscriber",
      email: normalized,
      source: typeof source === "string" ? source : "footer",
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "You're in. Thanks for subscribing.",
    });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
