"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormSettings {
  interestOptions: string[];
  portfolioOptions: string[];
  goalOptions: string[];
  preferredContactMethods: string[];
  riskAcknowledgement: string;
  replyMicrocopy: string;
}

interface ContactFormProps {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: JSX.Element;
  settings: FormSettings;
  className?: string;
}

type Status = "idle" | "sending" | "success" | "error";

const methodUsesEmail = (method: string) =>
  method.toLowerCase().includes("email");

const ContactForm = ({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "+91-8369031958",
  email = "info@lakshcapital.in",
  address = (
    <span>
      510, Damji Shamji Trade Centre,
      <br />
      Near Vidyavihar Railway Station,
      <br />
      Vidyavihar West, Mumbai, 400086
    </span>
  ),
  settings,
  className,
}: ContactFormProps) => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [preferredMethod, setPreferredMethod] = useState<string>(
    settings.preferredContactMethods[0] || ""
  );

  const emailRequired = methodUsesEmail(preferredMethod);
  const phoneRequired = !emailRequired;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: ((formData.get("email") as string) || "").trim(),
      phone: ((formData.get("phone") as string) || "").trim(),
      interest: formData.get("interest") as string,
      portfolio: formData.get("portfolio") as string,
      goal: formData.get("goal") as string,
      preferredContact: formData.get("preferredContact") as string,
      message: formData.get("message") as string,
      riskAck: formData.get("riskAck") === "on",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setPreferredMethod(settings.preferredContactMethods[0] || "");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data?.message || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={cn("py-8 md:py-12 lg:py-14", className)}>
      <div className="container relative px-2 py-8 md:px-4 md:py-12 lg:px-6 lg:py-14 bg-muted rounded-2xl">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h2 className="mb-2 text-3xl font-semibold lg:mb-1 lg:text-6xl">
                {title}
              </h2>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="list-none flex flex-col gap-2">
                <li className="flex items-start gap-2">
                  <MapPin className="size-4 mt-1" />
                  <p className="p-0">{address}</p>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="size-4 mt-1" />
                  <Link href={`tel:${phone}`} className="underline">
                    {phone}
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="size-4 mt-1" />
                  <Link href={`mailto:${email}`} className="underline">
                    {email}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto bg-background flex w-full max-w-3xl flex-col gap-5 rounded-lg border p-6 md:p-10"
          >
            {status === "success" && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-900"
              >
                <CheckCircle2 className="size-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Thanks — your enquiry is in.</p>
                  <p className="text-green-800/80 mt-0.5">
                    {settings.replyMicrocopy}
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-900"
              >
                <XCircle className="size-4 mt-0.5 shrink-0" />
                <p>{errorMessage || "Failed to send. Please try again."}</p>
              </div>
            )}

            <fieldset className="grid w-full items-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 p-4">
              <legend className="px-2 text-sm font-medium">
                How would you like us to reach you? *
              </legend>
              <div className="flex flex-wrap gap-4">
                {settings.preferredContactMethods.map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="preferredContact"
                      value={method}
                      required
                      checked={preferredMethod === method}
                      onChange={(e) => setPreferredMethod(e.target.value)}
                      className="size-4 accent-primary"
                    />
                    {method}
                  </label>
                ))}
              </div>
              <p className="px-2 text-xs text-muted-foreground">
                We&apos;ll mark the matching field below as required.
              </p>
            </fieldset>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">First Name *</Label>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  required
                  autoComplete="given-name"
                  placeholder="First name"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  autoComplete="family-name"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">
                  Email {emailRequired ? "*" : <span className="text-muted-foreground">(optional)</span>}
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required={emailRequired}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="phone">
                  Phone {phoneRequired ? "*" : <span className="text-muted-foreground">(optional)</span>}
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  required={phoneRequired}
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="interest">How can we help? *</Label>
              <select
                id="interest"
                name="interest"
                required
                defaultValue=""
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {settings.interestOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="portfolio">Current portfolio size *</Label>
              <select
                id="portfolio"
                name="portfolio"
                required
                defaultValue=""
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="" disabled>
                  Select a range
                </option>
                {settings.portfolioOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="goal">Primary financial goal *</Label>
              <select
                id="goal"
                name="goal"
                required
                defaultValue=""
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="" disabled>
                  Select a goal
                </option>
                {settings.goalOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                placeholder="Tell us a little about what you're looking for..."
                id="message"
                name="message"
                required
                rows={4}
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                name="riskAck"
                required
                className="mt-0.5 size-4 accent-primary"
              />
              <span>{settings.riskAcknowledgement}</span>
            </label>

            <Button
              type="submit"
              className="w-full"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  Sending...
                  <Loader2 className="size-3 animate-spin" />
                </>
              ) : (
                <>
                  Send Enquiry <Send className="size-3" />
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              {settings.replyMicrocopy}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
