export function formatLiveNav(liveNav?: string | null): string {
  const nav = liveNav ?? "";
  const parsedNav = Number(nav);

  if (isNaN(parsedNav) || nav === "N/A") {
    return "0";
  }

  return parsedNav.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
