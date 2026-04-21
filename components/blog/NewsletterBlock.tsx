"use client";

import { FormEvent, useState } from "react";

/** Dark newsletter signup block — used at the bottom of the blog listing. */
export default function NewsletterBlock() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-ink text-cream py-[100px] text-center relative z-[2]">
      <div className="container">
        <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold font-medium">
          Stay in the loop
        </div>
        <h2 className="font-display text-[clamp(40px,6vw,72px)] text-cream my-5">
          One email a month.<br />No fluff, no noise.
        </h2>
        <p className="max-w-[480px] mx-auto mb-9 text-[color-mix(in_oklab,oklch(0.985_0.008_85)_72%,transparent)]">
          Seasonal design previews, early-bird booking slots and the occasional local find. Unsubscribe with one click, always.
        </p>

        {status === "done" ? (
          <p className="text-gold font-serif text-[20px] italic">✓ Subscribed — see you in your inbox.</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex max-w-[480px] mx-auto border-b border-[color-mix(in_oklab,oklch(0.985_0.008_85)_35%,transparent)]"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 py-[18px] bg-transparent border-none font-serif text-[18px] text-cream outline-none placeholder:text-[color-mix(in_oklab,oklch(0.985_0.008_85)_45%,transparent)]"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-transparent border-none text-gold font-sans text-[11px] tracking-[0.22em] uppercase font-medium px-2 cursor-pointer disabled:opacity-60"
            >
              {status === "sending" ? "…" : "Subscribe ↗"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-[13px] text-[color-mix(in_oklab,oklch(0.985_0.008_85)_60%,transparent)]">
            Something went wrong — please try again.
          </p>
        )}
      </div>
    </section>
  );
}
