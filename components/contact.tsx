"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactProps {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: JSX.Element;
  className?: string;
}

const Contact = ({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "+91-8369031958",
  email = "info@lakshcapital.in",
  address = (
    <span>
      603, Pancham Pinnacle, Hingwala Lane,
      <br />
      Opp Zaverben Popatlal Auditorium,
      <br />
      Ghatkopar East, Mumbai - 400077
    </span>
  ),
  className,
}: ContactProps) => {
  const [status, setStatus] = useState("");

  const isLoading = status === "Sending...";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const name = `${firstname} ${lastname}`;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (res.ok) {
      setStatus("Message sent successfully!");
      form.reset();
    } else {
      setStatus("Failed to send message! Please try again later.");
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
            className="mx-auto bg-background flex max-w-3xl flex-col gap-6 rounded-lg border p-10"
          >
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  required
                  placeholder="First Name"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="Subject"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                placeholder="Type your message here"
                id="message"
                name="message"
                required
              />
              <span className="text-xs">{status}</span>
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <>
                  Sending...
                  <Loader2 className="size-3 animate-spin" />
                </>
              ) : (
                <>
                  Send Message <Send className="size-3" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
