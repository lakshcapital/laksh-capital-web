import { TRUST_STATS } from "@/data/trust";

const yearsActive = new Date().getFullYear() - TRUST_STATS.yearFounded;

const STATS = [
  { value: TRUST_STATS.aum, label: "Assets Under Advice" },
  { value: TRUST_STATS.familiesServed, label: "Families served" },
  { value: TRUST_STATS.countriesServed, label: "Countries served" },
  { value: `${yearsActive}+ yrs`, label: `Since ${TRUST_STATS.yearFounded}` },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Key statistics"
      className="border-y bg-muted/40"
    >
      <div className="container">
        <ul className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
          {STATS.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col items-center justify-center py-6 px-4 text-center"
            >
              <span className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground md:text-sm md:normal-case md:tracking-normal">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
