import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const SERVICES = [
  {
    file: "wealth-management.jpeg",
    title: "Wealth Management",
    description:
      "Holistic financial planning aligning investments, protection, and goals for long-term wealth creation.",
    order: 1,
    enlarge: true,
  },
  {
    file: "mutual-funds.jpeg",
    title: "Mutual Funds",
    description:
      "Goal-based mutual fund investments across equity, debt, and hybrid strategies, aligned with your long-term objectives.",
    order: 2,
  },
  {
    file: "portfolio-management.jpeg",
    title: "Portfolio Management Service (PMS)",
    description:
      "Professionally managed, customized portfolios designed to optimize returns based on individual risk profiles.",
    order: 3,
  },
  {
    file: "alternate-investment.jpeg",
    title: "Alternate Investment Fund (AIF)",
    description:
      "Access exclusive alternative investment opportunities beyond traditional assets for enhanced portfolio diversification.",
    order: 4,
  },
  {
    file: "specialised-investment.jpeg",
    title: "Specialised Investment Fund (SIF)",
    description:
      "Thematic and strategy-driven investments tailored for sophisticated investors seeking targeted growth opportunities.",
    order: 5,
  },
  {
    file: "gift-city.jpeg",
    title: "GIFT City",
    description:
      "Global investment solutions through GIFT City enabling tax-efficient, internationally diversified portfolios.",
    order: 6,
    enlarge: true,
  },
];

async function uploadImage(file) {
  const filePath = path.join(__dirname, "..", "assets", "services", file);
  const stream = fs.createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, { filename: file });
  return asset._id;
}

async function findExisting(title) {
  return client.fetch(
    `*[_type == "service" && title == $title][0]._id`,
    { title }
  );
}

async function run() {
  console.log(`Seeding ${SERVICES.length} services to dataset "${dataset}"...`);

  for (const svc of SERVICES) {
    const existingId = await findExisting(svc.title);
    if (existingId) {
      console.log(`  ↷ Skipping "${svc.title}" (already exists: ${existingId})`);
      continue;
    }

    console.log(`  ↑ Uploading ${svc.file}...`);
    const assetId = await uploadImage(svc.file);

    const doc = {
      _type: "service",
      title: svc.title,
      description: svc.description,
      order: svc.order,
      enlarge: svc.enlarge ?? false,
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      },
    };

    const created = await client.create(doc);
    console.log(`  ✓ Created "${svc.title}" (${created._id})`);
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
