// app/api/funds/route.ts
import { NextResponse } from "next/server";
import { APIFundMetrics, getLiveFundMetrics } from "@/lib/liveFund";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codesParam = searchParams.get("codes");

  if (!codesParam) {
    return NextResponse.json({ error: "Missing fund scheme codes query parameter" }, { status: 400 });
  }

  const codes = codesParam.split(",").filter(Boolean);

  try {
    // Process multiple funds in parallel safely
    const metricsPayload = await Promise.all(
      codes.map(async (code) => {
        const metrics = await getLiveFundMetrics(code);
        return { code, ...metrics };
      })
    );

    // Build the master lookup dictionary mapped by schemeCode identifier
    const lookupDictionary = metricsPayload.reduce((acc, current) => {
      const { code, ...allMetrics } = current;
      acc[code] = allMetrics; // Passes holdings, managerName, expense, cagr, etc.
      return acc;
    }, {} as Record<string, Omit<APIFundMetrics, 'code'>>);

    return NextResponse.json(lookupDictionary, {
      headers: {
        // Shared edge caching architecture for 12 hours to guarantee zero runtime lag
        "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[API Route Execution Error]:", error);
    return NextResponse.json({ error: "Failed optimizing stream queries" }, { status: 500 });
  }
}