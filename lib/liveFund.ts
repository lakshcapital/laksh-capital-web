export interface APIFundMetrics {
  nav: string;
  date: string;
  ticker: string;
  rating: number;
  classification: string;
  expense: string;
  navChange: string;
  inceptionDate: string;
  cagr: string;
  aum: string;
  benchmark: string;
  minInvestment: string;
  exitLoad: string;
  managerName: string;
  returnsPeriods: { period: string; fundVal: number; benchVal: number }[];
  holdings: { company: string; sector: string; percentage: number }[];
}

export async function getLiveFundMetrics(schemeCode: string): Promise<APIFundMetrics> {
  const fallback: APIFundMetrics = {
    nav: "N/A",
    date: "N/A",
    ticker: "N/A",
    rating: 5,
    classification: "N/A",
    expense: "N/A",
    navChange: "0.00%",
    inceptionDate: "N/A",
    cagr: "N/A",
    aum: "N/A",
    benchmark: "Nifty 50 TRI",
    minInvestment: "N/A",
    exitLoad: "N/A",
    managerName: "N/A",
    returnsPeriods: [],
    holdings: []
  };

  if (!schemeCode) return fallback;

  try {
    const isGiftCity = schemeCode.toUpperCase().includes("GIFT") || schemeCode.startsWith("USD");
    
    const baseUrl = isGiftCity 
      ? `https://api.mfapis.in/v1/gift-city-ifsc/${schemeCode}`
      : `https://api.mfapis.in/v1/portfolio-intelligence/${schemeCode}`;

    const res = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.MF_API_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      next: { 
        revalidate: 43200,
        tags: [`fund-metrics-${schemeCode}`]
      }
    });

    if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);

    const payload = await res.json();
    const raw = payload.data;

    return {
      nav: raw.live_pricing?.current_nav?.toString() || "N/A",
      date: raw.live_pricing?.as_of_date || "N/A",
      ticker: raw.scheme_metadata?.ticker_symbol || schemeCode,
      rating: raw.scheme_metadata?.star_rating || 5,
      classification: raw.scheme_metadata?.classification || "AIF Strategy Allocation",
      expense: raw.key_metrics?.expense_ratio_ter || "N/A",
      navChange: raw.live_pricing?.percentage_change || "0.00%",
      inceptionDate: raw.scheme_metadata?.inception_date || "N/A",
      cagr: raw.key_metrics?.cagr_percentage || "N/A",
      aum: raw.key_metrics?.aum_display || "N/A",
      benchmark: raw.scheme_metadata?.benchmark || "Nifty 50 TRI",
      minInvestment: raw.scheme_metadata?.min_investment || "N/A",
      exitLoad: raw.scheme_metadata?.exit_load_parameter || "N/A",
      managerName: raw.management?.lead_advisor || "N/A",
      returnsPeriods: raw.historical_performance?.map((p: any) => ({
        period: p.period,
        fundVal: p.fund_return,
        benchVal: p.benchmark_return
      })) || [],
      holdings: raw.portfolio_holdings || []
    };
  } catch (error) {
    console.error(`[Financial Engine API Error] Fail stream on code ${schemeCode}:`, error);
    return fallback;
  }
}