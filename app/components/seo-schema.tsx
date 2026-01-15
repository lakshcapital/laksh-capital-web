export default function SeoSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "Laksh Capital",
          url: "https://www.lakshcapital.in",
          description:
            "Wealth management and investment solutions offering mutual funds, PMS, AIF, SIF, GIFT city funds, NRI investing and retirement planning.",
          areaServed: "IN",
          sameAs: ["https://www.linkedin.com/company/lakshcapital"],
        }),
      }}
    />
  );
}
