// Fallback values for the contact form. Used when no contactSettings
// document exists in Sanity, OR for any individual field the editor
// has left blank.

export const CONTACT_DEFAULTS = {
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
