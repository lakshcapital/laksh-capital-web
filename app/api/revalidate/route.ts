import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

/**
 * Validates the cryptographic signature sent by Sanity to ensure data integrity
 */
async function isValidSanitySignature(request: NextRequest, secret: string): Promise<boolean> {
  const signature = request.headers.get("sanity-signature");
  if (!signature) return false;

  try {
    const rawBody = await request.clone().text();
    
    const computedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    const match = signature.match(/v1=([^,]+)/);
    const incomingHash = match ? match[1] : signature;

    return crypto.timingSafeEqual(
      Buffer.from(computedSignature, "hex"),
      Buffer.from(incomingHash, "hex")
    );
  } catch (error) {
    console.error("[Crypto Validation Exception Error]:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const localSecret = process.env.SANITY_REVALIDATE_SECRET;
    
    if (!localSecret) {
      console.error("[Revalidate API Configuration Error]: SANITY_REVALIDATE_SECRET environment variable is missing.");
      return NextResponse.json(
        { message: "Server misconfiguration: Secret token not configured" },
        { status: 500 }
      );
    }

    const isVerified = await isValidSanitySignature(request, localSecret);

    if (!isVerified) {
      return NextResponse.json(
        { message: "Unauthorized handshake token: Cryptographic signature mismatch" },
        { status: 401 }
      );
    }

    revalidateTag("catalogue-cache", "max");

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
      strategy: "stale-while-revalidate (max)",
      message: "Catalogue cache tagged for updates securely."
    });
  } catch (err) {
    console.error("[Revalidate API Catch Exception]:", err);
    return NextResponse.json(
      { message: "Failed parsing incoming webhook data stream" },
      { status: 500 }
    );
  }
}