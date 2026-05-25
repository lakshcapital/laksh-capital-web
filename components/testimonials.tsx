import { getAllTestimonials } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import TestimonialsView, { TestimonialItem } from "./testimonials-view";

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Harshil Bhadra",
    designation: "Business Owner",
    company: "L Trikhamdas",
    message:
      "I've had two one-on-one sessions with Dhruval, and he's truly exceptional at wealth management. He reviewed my portfolio, guided me with clear action points backed by real client case studies, and explained concepts like HUF in simple, practical language. His knowledge and clarity are highly impressive.",
  },
  {
    name: "CA Malay Shah",
    designation: "Assistant Manager",
    company: "Deloitte India",
    message:
      "Working with Laksh Capital has been an outstanding experience. Dhruval consistently demonstrates a strong commitment to innovative wealth creation strategies, with a clear focus on client success reflected in the results achieved.",
  },
  {
    name: "Rushabh Parikh",
    designation: "Business Owner",
    company: "Atithi Devo Bhav Holidays",
    message:
      "Laksh Capital helped me understand that investments shouldn't be seen in isolation. They assessed my risk profile, goals, and tax planning needs to create a customised portfolio. Their strategies boosted my confidence, and my portfolio turned positive within two months.",
  },
  {
    name: "Hardik Maniar",
    designation: "Associate Director",
    company: "MnM Talkies",
    message:
      "Our financial journey with Laksh Capital has been excellent. They understood our goals and guided us to diversify investments effectively, helping us move closer to achieving them. Their philosophy of building for tomorrow is truly reflected in their work.",
  },
  {
    name: "Karan Kamble",
    designation: "Business Owner",
    company: "KK Manpower Services",
    message:
      "I had absolutely no idea about finance or where to even start with investments. When I met Dhruval, he patiently walked me through the basics and explained mutual funds in a way that was easy to understand. He didn't just give advice — he showed me how it actually works, with examples that made sense to me. For the first time, I could see a clear path for growing my money and planning for the future. His guidance has made me feel confident about making financial decisions that I once found overwhelming.",
  },
  {
    name: "Suryansh Yadav",
    designation: "Software Engineer",
    company: "Advanced Infrastructure",
    message:
      "Laksh Capital helped me cut through the noise and focus on the right investments aligned with my long-term goals. I appreciated their structured, data-backed approach and the clarity they brought to every decision. Their guidance feels thoughtful, ethical, and truly personalized.",
  },
];

export default async function Testimonials() {
  const sanity = await getAllTestimonials();
  const items: TestimonialItem[] = sanity.length
    ? sanity.map((t) => ({
        name: t.name,
        designation: t.designation,
        company: t.company,
        message: t.message,
        avatarSrc: t.avatar
          ? urlFor(t.avatar).width(160).height(160).fit("crop").url()
          : undefined,
      }))
    : FALLBACK_TESTIMONIALS;

  return <TestimonialsView testimonials={items} />;
}
