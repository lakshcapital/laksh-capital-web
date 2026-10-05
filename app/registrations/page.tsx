import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getRegistrationDisclosure } from "@/sanity/queries";
import { RegistrationDisclosure } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Registration Disclosure | Laksh Capital",
  description:
    "AMFI / APMI registration numbers, validity periods, and the list of entities Laksh Capital is registered to distribute.",
};

export const revalidate = 60;

// Shown until the owner creates the registrationDisclosure document in Sanity Studio.
const FALLBACK: RegistrationDisclosure = {
  _id: "fallback",
  legalEntity: "Niveshmitra Capital Services Private Limited",
  amfiArn: "ARN-339767",
  amfiArnValidFrom: "09/09/2025",
  amfiArnValidTo: "08/09/2028",
  aprn: "APRN-07045",
  aprnValidFrom: "07/01/2025",
  aprnValidTo: "06/01/2028",
  riskDisclaimer:
    "Mutual fund investments are subject to market risks. Read all scheme related documents carefully. Past performance is not indicative of future results. Investors should consult their financial advisor before investing.",
  registrations: [],
};

export default async function RegistrationsPage() {
  const data = (await getRegistrationDisclosure()) ?? FALLBACK;

  const registrations = data.registrations ?? [];
  const groups = registrations.reduce<Record<string, typeof registrations>>(
    (acc, entry) => {
      (acc[entry.category] ??= []).push(entry);
      return acc;
    },
    {}
  );

  return (
    <div className="container max-w-5xl mx-auto py-16 md:py-24 lg:py-28">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>

      <header className="flex flex-col items-center gap-5 mb-14 text-center">
        <Badge variant="outline" className="font-semibold">
          Regulatory
        </Badge>
        <h1 className="text-3xl font-semibold lg:text-6xl max-w-3xl">
          Registration Disclosure
        </h1>
        <p className="text-muted-foreground lg:text-lg max-w-2xl">
          {data.introText ||
            `${
              data.legalEntity || "Laksh Capital"
            } operates under Indian financial advisory regulations. Our current registration numbers and their validity periods are listed below.`}
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border bg-muted/30 p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            AMFI Registered Mutual Fund Distributor
          </p>
          <p className="mt-2 text-2xl font-semibold">{data.amfiArn}</p>
          {data.amfiArnValidFrom && data.amfiArnValidTo && (
            <p className="mt-1 text-sm text-muted-foreground">
              Valid {data.amfiArnValidFrom} - {data.amfiArnValidTo}
            </p>
          )}
        </div>
        <div className="rounded-2xl border bg-muted/30 p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            APMI Registered PMS Distributor
          </p>
          <p className="mt-2 text-2xl font-semibold">{data.aprn}</p>
          {data.aprnValidFrom && data.aprnValidTo && (
            <p className="mt-1 text-sm text-muted-foreground">
              Valid {data.aprnValidFrom} - {data.aprnValidTo}
            </p>
          )}
        </div>
      </div>

      {(data.principalOfficer || data.grievanceOfficer?.name) && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {data.principalOfficer && (
            <div className="rounded-2xl border p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Principal Officer
              </p>
              <p className="mt-2 font-medium">{data.principalOfficer}</p>
              {data.euin && (
                <p className="mt-1 text-sm text-muted-foreground">
                  EUIN: {data.euin}
                </p>
              )}
            </div>
          )}
          {data.grievanceOfficer?.name && (
            <div className="rounded-2xl border p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Grievance Officer
              </p>
              <p className="mt-2 font-medium">{data.grievanceOfficer.name}</p>
              <div className="mt-1 flex flex-col gap-1 text-sm text-muted-foreground">
                {data.grievanceOfficer.email && (
                  <Link
                    href={`mailto:${data.grievanceOfficer.email}`}
                    className="flex items-center gap-1.5 hover:text-foreground"
                  >
                    <Mail className="size-3.5" />
                    {data.grievanceOfficer.email}
                  </Link>
                )}
                {data.grievanceOfficer.phone && (
                  <Link
                    href={`tel:${data.grievanceOfficer.phone}`}
                    className="flex items-center gap-1.5 hover:text-foreground"
                  >
                    <Phone className="size-3.5" />
                    {data.grievanceOfficer.phone}
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <section className="mt-14">
        <h2 className="text-xl font-semibold mb-6">Registered Entities</h2>

        {Object.keys(groups).length > 0 ? (
          <div className="flex flex-col gap-10">
            {Object.entries(groups).map(([category, entries]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  {category}
                </h3>
                <div className="overflow-x-auto rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left">
                      <tr>
                        <th className="p-3 font-semibold">Entity / AMC Name</th>
                        <th className="p-3 font-semibold">
                          SEBI Registration No.
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((entry, i) => (
                        <tr
                          key={`${entry.entityName}-${i}`}
                          className="border-t"
                        >
                          <td className="p-3">{entry.entityName}</td>
                          <td className="p-3 text-muted-foreground">
                            {entry.registrationNumber}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            The list of registered AMCs / funds will appear here once added
            in the Studio.
          </p>
        )}
      </section>

      {data.riskDisclaimer && (
        <div className="mt-14 rounded-2xl border bg-muted/30 p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                Risk Disclaimer:
              </span>{" "}
              {data.riskDisclaimer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
