"use client";

import { useState } from "react";
import { Loader2, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

interface NewsletterFormProps {
  source?: "footer" | "blog" | "homepage";
  variant?: "light" | "dark";
  className?: string;
  title?: string;
  description?: string;
}

export default function NewsletterForm({
  source = "footer",
  variant = "dark",
  className,
  title = "Get Dhruval's monthly markets brief",
  description = "Honest commentary on markets, tax, and long-term wealth. No spam — unsubscribe any time.",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "You're in.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const isDark = variant === "dark";

  return (
    <div className={cn(className)}>
      {title && (
        <h3
          className={cn(
            "text-lg font-semibold",
            isDark ? "text-white" : "text-foreground"
          )}
        >
          {title}
        </h3>
      )}
      {description && (
        <p
          className={cn(
            "mt-1 text-sm",
            isDark ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}

      <form
        onSubmit={submit}
        className="mt-4 flex flex-col gap-2 sm:flex-row"
      >
        <div
          className={cn(
            "flex flex-1 items-center gap-2 rounded-md border px-3 py-2",
            isDark
              ? "border-white/20 bg-white/5 text-white placeholder:text-white/60"
              : "border-border bg-background"
          )}
        >
          <Mail className={cn("size-4", isDark ? "text-white/60" : "text-muted-foreground")} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoComplete="email"
            disabled={status === "sending"}
            aria-label="Email address"
            className={cn(
              "flex-1 bg-transparent text-sm outline-none",
              isDark ? "placeholder:text-white/50" : "placeholder:text-muted-foreground"
            )}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors",
            isDark
              ? "bg-white text-primary hover:bg-white/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90",
            "disabled:opacity-60"
          )}
        >
          {status === "sending" ? (
            <>
              Sending <Loader2 className="size-3 animate-spin" />
            </>
          ) : (
            <>
              Subscribe <Send className="size-3" />
            </>
          )}
        </button>
      </form>

      {message && (
        <p
          role={status === "error" ? "alert" : "status"}
          className={cn(
            "mt-3 text-xs",
            status === "error"
              ? isDark
                ? "text-red-200"
                : "text-red-600"
              : isDark
              ? "text-emerald-200"
              : "text-emerald-700"
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}
