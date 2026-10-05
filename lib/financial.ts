export interface LiveNavResponse {
  nav: string;
  date: string;
}

export async function getLiveNavAndDate(schemeCode: string): Promise<LiveNavResponse> {
  const fallback = { nav: "N/A", date: "N/A" };
  if (!schemeCode) return fallback;

  try {
    const res = await fetch(`https://api.mfapi.in/mf/${schemeCode}/latest`, {
      next: { 
        revalidate: 43200,
        tags: [`nav-${schemeCode}`]
      }
    });

    if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);

    const payload = await res.json();
    return {
      nav: payload?.data?.[0]?.nav || "N/A",
      date: payload?.data?.[0]?.date || "N/A"
    };
  } catch (error) {
    console.error(`[Financial Engine API Error] Fail stream on code ${schemeCode}:`, error);
    return fallback;
  }
}