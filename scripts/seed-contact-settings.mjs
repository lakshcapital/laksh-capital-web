import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const DOC = {
  _type: "contactSettings",
  interestOptions: [
    "General enquiry",
    "Mutual Fund / SIP advisory",
    "PMS / AIF",
    "SIF / GIFT City funds",
    "NRI investments",
    "Tax planning",
    "Retirement planning",
    "I'm already a client",
  ],
  portfolioOptions: [
    "Just starting (under ₹10 L)",
    "₹10 L – ₹1 Cr",
    "₹1 Cr – ₹5 Cr",
    "₹5 Cr – ₹25 Cr",
    "₹25 Cr+",
    "Prefer not to say",
  ],
  goalOptions: [
    "Wealth creation (long-term growth)",
    "Retirement corpus",
    "Children's education",
    "Tax-efficient investing",
    "NRI repatriation / GIFT City",
    "Estate / legacy planning",
    "Just exploring",
  ],
  preferredContactMethods: ["Email", "Phone call", "WhatsApp"],
  riskAcknowledgement:
    "I understand that mutual fund and securities investments are subject to market risks, and that past performance does not guarantee future returns.",
  replyMicrocopy: "We'll get back to you shortly.",
};

async function run() {
  const existingId = await client.fetch(
    `*[_type == "contactSettings"][0]._id`
  );
  if (existingId) {
    console.log(`↷ Skipping — contactSettings already exists (${existingId})`);
    return;
  }

  const created = await client.create(DOC);
  console.log(`✓ Created contactSettings (${created._id})`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
