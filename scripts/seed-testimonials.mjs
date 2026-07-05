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

const TESTIMONIALS = [
  {
    name: "Harshil Bhadra",
    designation: "Business Owner",
    company: "L Trikhamdas",
    message:
      "I've had two one-on-one sessions with Dhruval, and he's truly exceptional at wealth management. He reviewed my portfolio, guided me with clear action points backed by real client case studies, and explained concepts like HUF in simple, practical language. His knowledge and clarity are highly impressive.",
    order: 1,
  },
  {
    name: "CA Malay Shah",
    designation: "Assistant Manager",
    company: "Deloitte India",
    message:
      "Working with Laksh Capital has been an outstanding experience. Dhruval consistently demonstrates a strong commitment to innovative wealth creation strategies, with a clear focus on client success reflected in the results achieved.",
    order: 2,
  },
  {
    name: "Rushabh Parikh",
    designation: "Business Owner",
    company: "Atithi Devo Bhav Holidays",
    message:
      "Laksh Capital helped me understand that investments shouldn't be seen in isolation. They assessed my risk profile, goals, and tax planning needs to create a customised portfolio. Their strategies boosted my confidence, and my portfolio turned positive within two months.",
    order: 3,
  },
  {
    name: "Hardik Maniar",
    designation: "Associate Director",
    company: "MnM Talkies",
    message:
      "Our financial journey with Laksh Capital has been excellent. They understood our goals and guided us to diversify investments effectively, helping us move closer to achieving them. Their philosophy of building for tomorrow is truly reflected in their work.",
    order: 4,
  },
  {
    name: "Karan Kamble",
    designation: "Business Owner",
    company: "KK Manpower Services",
    message:
      "I had absolutely no idea about finance or where to even start with investments. When I met Dhruval, he patiently walked me through the basics and explained mutual funds in a way that was easy to understand. He didn't just give advice — he showed me how it actually works, with examples that made sense to me. For the first time, I could see a clear path for growing my money and planning for the future. His guidance has made me feel confident about making financial decisions that I once found overwhelming.",
    order: 5,
  },
  {
    name: "Suryansh Yadav",
    designation: "Software Engineer",
    company: "Advanced Infrastructure",
    message:
      "Laksh Capital helped me cut through the noise and focus on the right investments aligned with my long-term goals. I appreciated their structured, data-backed approach and the clarity they brought to every decision. Their guidance feels thoughtful, ethical, and truly personalized.",
    order: 6,
  },
];

async function findExisting(name) {
  return client.fetch(`*[_type == "testimonial" && name == $name][0]._id`, {
    name,
  });
}

async function run() {
  console.log(
    `Seeding ${TESTIMONIALS.length} testimonials to dataset "${dataset}"...`
  );

  for (const t of TESTIMONIALS) {
    const existingId = await findExisting(t.name);
    if (existingId) {
      console.log(`  ↷ Skipping "${t.name}" (already exists: ${existingId})`);
      continue;
    }

    const doc = {
      _type: "testimonial",
      name: t.name,
      designation: t.designation,
      company: t.company,
      message: t.message,
      order: t.order,
    };

    const created = await client.create(doc);
    console.log(`  ✓ Created "${t.name}" (${created._id})`);
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
