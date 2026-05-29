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

const TEAM = [
  { file: "dhruval.jpeg", name: "CA Dhruval Shah", role: "Founder & Managing Director", order: 1 },
  { file: "siddharth.jpeg", name: "CA Siddharth Mehta", role: "Head of Overseas Investments", order: 2 },
  { file: "punit.jpeg", name: "CA Punit Sheth", role: "Head of Strategy", order: 3 },
  { file: "rachit.jpeg", name: "CA Rachit Diyora", role: "Business Development", order: 4 },
  { file: "hardik.jpeg", name: "CA Hardik Mehta", role: "Head of Investments", order: 5 },
];

async function uploadImage(file) {
  const filePath = path.join(__dirname, "..", "assets", "team", file);
  const stream = fs.createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, { filename: file });
  return asset._id;
}

async function findExisting(name) {
  return client.fetch(`*[_type == "teamMember" && name == $name][0]._id`, {
    name,
  });
}

async function run() {
  console.log(`Seeding ${TEAM.length} team members to dataset "${dataset}"...`);

  for (const member of TEAM) {
    const existingId = await findExisting(member.name);
    if (existingId) {
      console.log(`  ↷ Skipping "${member.name}" (already exists: ${existingId})`);
      continue;
    }

    console.log(`  ↑ Uploading ${member.file}...`);
    const assetId = await uploadImage(member.file);

    const doc = {
      _type: "teamMember",
      name: member.name,
      role: member.role,
      order: member.order,
      avatar: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      },
    };

    const created = await client.create(doc);
    console.log(`  ✓ Created "${member.name}" (${created._id})`);
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
