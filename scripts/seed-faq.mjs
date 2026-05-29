import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";

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

const key = () => randomUUID().slice(0, 12);

const para = (text) => ({
  _type: "block",
  _key: key(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const bullet = (text) => ({
  _type: "block",
  _key: key(),
  style: "normal",
  listItem: "bullet",
  level: 1,
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const quote = (text, author) => ({
  _type: "quote",
  _key: key(),
  text,
  author,
});

const FAQ = [
  {
    order: 1,
    question: "Who do we work with?",
    answer: [
      para(
        "At Laksh Capital, we partner with a diverse set of clients—business owners, salaried professionals, retirees, single women, and NRIs. Our philosophy is simple: equal attention, not identical portfolios. We don't measure relationships by the size of your first cheque."
      ),
      para(
        "Our true strength lies in serving the Middle Net-worth Individual (MNI)."
      ),
      quote("We don't chase HNIs, we create them.", "Parag Parikh"),
      para(
        "We work best with those who value long-term thinking, simplicity, and commitment to the journey."
      ),
    ],
  },
  {
    order: 2,
    question: "Who are not our ideal clients?",
    answer: [
      para("Laksh Capital may not be the right partner if you:"),
      bullet("Chase short-term or speculative returns"),
      bullet("Constantly compare portfolios driven by fear or greed"),
      bullet("Track investments daily or weekly expecting instant results"),
      bullet("Rely more on online platforms than research-led advisory"),
      bullet("Prioritise cost over long-term value and disciplined advice"),
      para(
        "We don't set a minimum investment amount—but we do set a minimum philosophy requirement."
      ),
      para(
        "Real results reveal themselves after 5 years. If that feels too long, we may not be the right fit."
      ),
    ],
  },
  {
    order: 3,
    question: "What can't (and won't) we do?",
    answer: [
      para(
        "We believe strong relationships are built on clear expectations."
      ),
      bullet("We don't predict short-term market movements"),
      bullet("We don't focus on quick wins or overnight wealth"),
      bullet("We don't actively trade or churn portfolios"),
      bullet("Most of the time, we prefer doing nothing"),
      bullet("We avoid unnecessary interference once a plan is in place"),
      bullet("We won't chase you for investments"),
      para(
        "Our relationship is like that of a doctor and patient — when you need us, we're fully committed."
      ),
    ],
  },
  {
    order: 4,
    question: "Do you manage clients outside Mumbai?",
    answer: [
      para(
        "Absolutely. We manage clients across India and in over 25 countries globally. With Zoom and digital tools, we're always an e-meeting away. If you're ever in Mumbai, we'd love to host you for an in-person conversation — some discussions are just better over coffee."
      ),
    ],
  },
  {
    order: 5,
    question: "Can you help invest in direct stocks?",
    answer: [
      para(
        "We don't deal in direct stocks. Our approach focuses on long-term investing through Mutual Funds, PMS, AIFs, and structured products."
      ),
      para(
        "Our own family wealth has been built using this disciplined approach, delivering long-term annualised returns of 15-18%. We believe in simplicity, diversification, and staying focused on goals — not chasing stock tips."
      ),
    ],
  },
  {
    order: 6,
    question: "What returns can I expect?",
    answer: [
      para(
        "Returns depend on who you are and how consistently you follow the process."
      ),
      quote(
        "People do not get what they want or expect from markets; they get what they deserve.",
        "Bill Bonner"
      ),
      para(
        "Historically, over a 10-year horizon, most investors have earned 10-15% annually. Past performance is not a guarantee of future returns."
      ),
    ],
  },
  {
    order: 7,
    question: "Can I approach you if I already have an advisor or MFD?",
    answer: [
      para(
        "If you're happy with your current advisor, we encourage you to stay with them. If you're unhappy or uncertain, we're happy to have a conversation to understand why."
      ),
      para(
        "We strongly believe in avoiding multi-advisor setups, as they often lead to confusion and poor outcomes. If you value clarity, simplicity, and long-term thinking, we might be a great fit."
      ),
    ],
  },
  {
    order: 8,
    question: "Can you help me choose the best fund?",
    answer: [
      para(
        'Wealth creation is not about picking the "best fund" — fund selection contributes only about 5% to success.'
      ),
      bullet("Correct asset allocation"),
      bullet("Timely rebalancing"),
      bullet("Portfolio-level performance focus"),
      para(
        "We help build disciplined, goal-based strategies — not chase top performers."
      ),
    ],
  },
  {
    order: 9,
    question: "How often do you review portfolios or conduct meetings?",
    answer: [
      para(
        "More activity doesn't mean better outcomes. In most cases, an annual review is sufficient."
      ),
      para("You should reach out when:"),
      bullet("You want to invest more"),
      bullet("You need to withdraw funds"),
      bullet("Your personal situation changes"),
      quote(
        "We don't get paid for activity, we get paid for being right.",
        "Warren Buffett"
      ),
      para(
        "Whenever you reach out, our team is prompt, accessible, and fully committed to you."
      ),
    ],
  },
];

async function findExisting(question) {
  return client.fetch(
    `*[_type == "faqItem" && question == $question][0]._id`,
    { question }
  );
}

async function run() {
  console.log(`Seeding ${FAQ.length} FAQ items to dataset "${dataset}"...`);

  for (const item of FAQ) {
    const existingId = await findExisting(item.question);
    if (existingId) {
      console.log(
        `  ↷ Skipping "${item.question}" (already exists: ${existingId})`
      );
      continue;
    }

    const doc = {
      _type: "faqItem",
      question: item.question,
      answer: item.answer,
      order: item.order,
    };

    const created = await client.create(doc);
    console.log(`  ✓ Created "${item.question}" (${created._id})`);
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
