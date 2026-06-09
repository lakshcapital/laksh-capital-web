import { getContactSettings } from "@/sanity/queries";
import { CONTACT_DEFAULTS } from "@/data/contact-defaults";
import ContactForm from "./contact-form";

export default async function Contact() {
  const sanity = await getContactSettings();

  const settings = {
    interestOptions:
      sanity?.interestOptions?.length
        ? sanity.interestOptions
        : CONTACT_DEFAULTS.interestOptions,
    portfolioOptions:
      sanity?.portfolioOptions?.length
        ? sanity.portfolioOptions
        : CONTACT_DEFAULTS.portfolioOptions,
    goalOptions:
      sanity?.goalOptions?.length
        ? sanity.goalOptions
        : CONTACT_DEFAULTS.goalOptions,
    preferredContactMethods: CONTACT_DEFAULTS.preferredContactMethods,
    riskAcknowledgement: CONTACT_DEFAULTS.riskAcknowledgement,
    replyMicrocopy: CONTACT_DEFAULTS.replyMicrocopy,
  };

  return <ContactForm settings={settings} />;
}
