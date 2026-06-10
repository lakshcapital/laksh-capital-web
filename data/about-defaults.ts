// Fallback values for the About section. Used when no aboutSettings
// document exists in Sanity, OR for any individual field the editor
// has left blank.
export const ABOUT_DEFAULTS = {
  description:
    "We offer wealth management solutions, furnishing accurate information to investors and providing impartial guidance to achieve their financial objectives. Our dedicated team is focused on generating wealth for clients in alignment with their individual needs and aspirations, all aimed at attaining their financial milestones.",
  missionText:
    "To be the trusted partner in shaping our client's financial success and security and provide unbiased, ethical and personalized wealth management solutions.",
  frameworkHeading: "Our Investment Framework",
  frameworkDescription:
    "We conduct extensive research across all financial products and asset classes. Our team continuously evaluates market opportunities to shortlist only the best and most reliable options",
  frameworkCards: [
    {
      icon: "UserRoundCheck",
      title: "Client-Centric Approach",
      description:
        "Every investor is unique. We assess your financial profile, risk appetite, and goals to provide truly personalized recommendations.",
    },
    {
      icon: "Target",
      title: "Goal-Based Planning",
      description:
        "Wealth works when it meets life goals. We align investments with milestones like child education, retirement, legacy planning etc.",
    },
    {
      icon: "SlidersHorizontal",
      title: "Tailored Investment Solutions",
      description:
        "We recommend investment products - mutual funds, AIFs, PMS, and more - aligned with your goals to maximize returns while protecting capital.",
    },
  ],
};
