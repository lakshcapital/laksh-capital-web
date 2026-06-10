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

const HERO = {
  _type: "heroSettings",
  badge: "Trusted by 1000+ Clients Worldwide",
  heading: "Guiding Your Wealth, Securing Your Future",
  description:
    "At Laksh Capital, we deliver expert investment and wealth management solutions with clarity and integrity; helping you grow, protect, and achieve your financial goals with confidence.",
  buttonText: "Schedule a Consultation",
};

const ABOUT = {
  _type: "aboutSettings",
  description:
    "We offer wealth management solutions, furnishing accurate information to investors and providing impartial guidance to achieve their financial objectives. Our dedicated team is focused on generating wealth for clients in alignment with their individual needs and aspirations, all aimed at attaining their financial milestones.",
  missionText:
    "To be the trusted partner in shaping our client's financial success and security and provide unbiased, ethical and personalized wealth management solutions.",
  frameworkHeading: "Our Investment Framework",
  frameworkDescription:
    "We conduct extensive research across all financial products and asset classes. Our team continuously evaluates market opportunities to shortlist only the best and most reliable options",
  frameworkCards: [
    {
      _type: "card",
      icon: "UserRoundCheck",
      title: "Client-Centric Approach",
      description:
        "Every investor is unique. We assess your financial profile, risk appetite, and goals to provide truly personalized recommendations.",
    },
    {
      _type: "card",
      icon: "Target",
      title: "Goal-Based Planning",
      description:
        "Wealth works when it meets life goals. We align investments with milestones like child education, retirement, legacy planning etc.",
    },
    {
      _type: "card",
      icon: "SlidersHorizontal",
      title: "Tailored Investment Solutions",
      description:
        "We recommend investment products - mutual funds, AIFs, PMS, and more - aligned with your goals to maximize returns while protecting capital.",
    },
  ],
};

async function seedSingleton(typeName, doc, label) {
  const existing = await client.fetch(`*[_type == $t]{ _id }`, { t: typeName });

  for (const old of existing) {
    await client.delete(old._id);
    console.log(`  ✗ Deleted old ${label} (${old._id})`);
  }

  const created = await client.create(doc);
  console.log(`  ✓ Created ${label} (${created._id})`);
}

async function run() {
  console.log("Seeding Hero...");
  await seedSingleton("heroSettings", HERO, "heroSettings");

  console.log("Seeding About...");
  await seedSingleton("aboutSettings", ABOUT, "aboutSettings");

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
