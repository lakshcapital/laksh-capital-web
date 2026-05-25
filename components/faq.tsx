import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JSX } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { getAllFaqItems } from "@/sanity/queries";
import { FaqItem as SanityFaqItem } from "@/sanity/types";

interface FaqRenderItem {
  id: string;
  question: string;
  answer: JSX.Element;
}

interface FAQProps {
  heading?: string;
  description?: string;
  className?: string;
}

const faqPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    strong: ({ children }) => (
      <span className="font-medium text-foreground">{children}</span>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-1">{children}</ol>
    ),
  },
  types: {
    quote: ({ value }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-primary">
        {value?.text}
        {value?.author && (
          <span className="block mt-1 text-xs">- {value.author}</span>
        )}
      </blockquote>
    ),
  },
};

const renderSanityAnswer = (item: SanityFaqItem): JSX.Element => (
  <div className="space-y-3 text-sm">
    <PortableText value={item.answer} components={faqPortableTextComponents} />
  </div>
);

const FALLBACK_ITEMS: FaqRenderItem[] = [
  {
    id: "1",
    question: "Who do we work with?",
    answer: (
      <div className="space-y-3 text-sm">
        <p>
          At Laksh Capital, we partner with a diverse set of clients—business
          owners, salaried professionals, retirees, single women, and NRIs. Our
          philosophy is simple:{" "}
          <span className="font-medium text-foreground">
            equal attention, not identical portfolios.
          </span>
          We don&apos;t measure relationships by the size of your first cheque.
        </p>
        <p>
          Our true strength lies in serving the Middle Net-worth Individual
          (MNI).
        </p>
        <blockquote className="border-l-4 border-primary pl-4 italic text-primary">
          “We don&apos;t chase HNIs, we create them.”
          <span className="block mt-1 text-xs">- Parag Parikh</span>
        </blockquote>
        <p>
          We work best with those who value long-term thinking, simplicity, and
          commitment to the journey.
        </p>
      </div>
    ),
  },
  {
    id: "2",
    question: "Who are not our ideal clients?",
    answer: (
      <div className="space-y-3 text-sm">
        <p>Laksh Capital may not be the right partner if you:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Chase short-term or speculative returns</li>
          <li>Constantly compare portfolios driven by fear or greed</li>
          <li>Track investments daily or weekly expecting instant results</li>
          <li>Rely more on online platforms than research-led advisory</li>
          <li>Prioritise cost over long-term value and disciplined advice</li>
        </ul>
        <p>
          We don&apos;t set a minimum investment amount—but we do set a
          <span className="font-medium text-foreground">
            {" "}
            minimum philosophy requirement.
          </span>
        </p>
        <p>
          Real results reveal themselves after{" "}
          <span className="font-medium">5 years</span>. If that feels too long,
          we may not be the right fit.
        </p>
      </div>
    ),
  },
  {
    id: "3",
    question: "What can't (and won't) we do?",
    answer: (
      <div className="space-y-3 text-sm">
        <p>We believe strong relationships are built on clear expectations.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>We don&apos;t predict short-term market movements</li>
          <li>We don&apos;t focus on quick wins or overnight wealth</li>
          <li>We don&apos;t actively trade or churn portfolios</li>
          <li>Most of the time, we prefer doing nothing</li>
          <li>We avoid unnecessary interference once a plan is in place</li>
          <li>We won&apos;t chase you for investments</li>
        </ul>
        <p>
          Our relationship is like that of a doctor and patient - when you need
          us, we&apos;re fully committed.
        </p>
      </div>
    ),
  },
  {
    id: "4",
    question: "Do you manage clients outside Mumbai?",
    answer: (
      <div className="space-y-3 text-sm">
        <p>
          Absolutely. We manage clients across India and in over
          <span className="font-medium text-foreground">
            {" "}
            25 countries globally.{" "}
          </span>
          With Zoom and digital tools, we&apos;re always an e-meeting away. If
          you&apos;re ever in Mumbai, we&apos;d love to host you for an
          in-person conversation - some discussions are just better over coffee.
        </p>
      </div>
    ),
  },
  {
    id: "5",
    question: "Can you help invest in direct stocks?",
    answer: (
      <div className="space-y-3 text-sm">
        <p>
          We don&apos;t deal in direct stocks. Our approach focuses on long-term
          investing through
          <span className="font-medium text-foreground">
            {" "}
            Mutual Funds, PMS, AIFs, and structured products.
          </span>
        </p>
        <p>
          Our own family wealth has been built using this disciplined approach,
          delivering long-term annualised returns of 15-18%. We believe in
          simplicity, diversification, and staying focused on goals - not
          chasing stock tips.
        </p>
      </div>
    ),
  },
  {
    id: "6",
    question: "What returns can I expect?",
    answer: (
      <div className="space-y-3 text-sm">
        <p>
          Returns depend on who you are and how consistently you follow the
          process.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 italic text-primary">
          “People do not get what they want or expect from markets; they get
          what they deserve.”
          <span className="block mt-1 text-xs">- Bill Bonner</span>
        </blockquote>
        <p>
          Historically, over a 10-year horizon, most investors have earned
          <span className="text-foreground"> 10-15% annually.</span> Past
          performance is not a guarantee of future returns.
        </p>
      </div>
    ),
  },
  {
    id: "7",
    question: "Can I approach you if I already have an advisor or MFD?",
    answer: (
      <div className="space-y-3 text-sm">
        <p>
          If you&apos;re happy with your current advisor, we encourage you to
          stay with them. If you&apos;re unhappy or uncertain, we&apos;re happy
          to have a conversation to understand why.
        </p>
        <p>
          We strongly believe in avoiding multi-advisor setups, as they often
          lead to confusion and poor outcomes. If you value clarity, simplicity,
          and long-term thinking, we might be a great fit.
        </p>
      </div>
    ),
  },
  {
    id: "8",
    question: "Can you help me choose the best fund?",
    answer: (
      <div className="space-y-3 text-sm">
        <p>
          Wealth creation is not about picking the “best fund” - fund selection
          contributes only about <span className="text-foreground">5%</span> to
          success.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Correct asset allocation</li>
          <li>Timely rebalancing</li>
          <li>Portfolio-level performance focus</li>
        </ul>
        <p>
          We help build disciplined, goal-based strategies - not chase top
          performers.
        </p>
      </div>
    ),
  },
  {
    id: "9",
    question: "How often do you review portfolios or conduct meetings?",
    answer: (
      <div className="space-y-3 text-sm">
        <p>
          More activity doesn&apos;t mean better outcomes. In most cases, an
          annual review is sufficient.
        </p>
        <p>You should reach out when:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>You want to invest more</li>
          <li>You need to withdraw funds</li>
          <li>Your personal situation changes</li>
        </ul>
        <blockquote className="border-l-4 border-primary pl-4 italic text-primary">
          “We don&apos;t get paid for activity, we get paid for being right.”
          <span className="block mt-1 text-xs">- Warren Buffett</span>
        </blockquote>
        <p>
          Whenever you reach out, our team is prompt, accessible, and fully
          committed to you.
        </p>
      </div>
    ),
  },
];

const FAQ = async ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  className,
}: FAQProps) => {
  const sanity = await getAllFaqItems();
  const items: FaqRenderItem[] = sanity.length
    ? sanity.map((item) => ({
        id: item._id,
        question: item.question,
        answer: renderSanityAnswer(item),
      }))
    : FALLBACK_ITEMS;

  return (
    <section id="faq" className={cn("py-16 md:py-24 lg:py-28", className)}>
      <div className="container space-y-16">
        <div className="mx-auto max-w-4xl flex flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-6xl">
            {heading}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl lg:text-lg">
            {description}
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
