"use client";

import { FormEvent, useState } from "react";

const serviceOptions = [
  "Gel Manicure",
  "Spa Pedicure",
  "Acrylic Full Set",
  "SNS / Dipping",
  "Nail Art",
  "Bridal",
  "Waxing",
  "Something else",
];

const dayOptions = [
  "Any weekday",
  "Tuesday",
  "Wednesday",
  "Thursday (late)",
  "Friday",
  "Saturday",
  "Sunday",
];

/** Contact / enquiry form — POST to /api/contact route. */
export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-[clamp(72px,10vw,140px)] relative">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-[clamp(32px,6vw,80px)] reveal">

          {/* Intro */}
          <div>
            <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold-deep font-medium">
              Get in touch
            </div>
            <h2 className="font-display text-[clamp(44px,6vw,76px)] leading-[0.95] mt-3.5 mb-6">
              Questions,<br />bridal, gift<br />cards —{" "}
              <em className="font-serif italic font-light text-gold-deep">say hi.</em>
            </h2>
            <p className="text-ink-soft mb-7 max-w-[440px]">
              Drop us a note and we'll reply between services, usually the same day. Or skip the form and call — we honestly prefer it.
            </p>

            <div className="font-serif text-[44px] mt-7 pt-7 border-t border-rule block">
              <small className="block font-sans text-[11px] tracking-[0.22em] uppercase text-ink-faint mb-2.5">
                Call direct
              </small>
              <a href="tel:0489191550" className="border-b-2 border-gold hover:text-gold-deep transition-colors">
                0489 191 550
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-ink-faint font-medium mb-2">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="First & last"
                  className="w-full py-3.5 border-0 border-b border-rule bg-transparent font-serif text-[18px] text-ink outline-none focus:border-gold transition-colors placeholder:text-ink-faint"
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-ink-faint font-medium mb-2">
                  Phone
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="04xx xxx xxx"
                  className="w-full py-3.5 border-0 border-b border-rule bg-transparent font-serif text-[18px] text-ink outline-none focus:border-gold transition-colors placeholder:text-ink-faint"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-ink-faint font-medium mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                className="w-full py-3.5 border-0 border-b border-rule bg-transparent font-serif text-[18px] text-ink outline-none focus:border-gold transition-colors placeholder:text-ink-faint"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-ink-faint font-medium mb-2">
                  Service interest
                </label>
                <select
                  name="service"
                  className="w-full py-3.5 border-0 border-b border-rule bg-transparent font-serif text-[18px] text-ink outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                >
                  {serviceOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-ink-faint font-medium mb-2">
                  Preferred day
                </label>
                <select
                  name="day"
                  className="w-full py-3.5 border-0 border-b border-rule bg-transparent font-serif text-[18px] text-ink outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                >
                  {dayOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-sans text-[10px] tracking-[0.22em] uppercase text-ink-faint font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Anything we should know ahead of your visit?"
                rows={3}
                className="w-full py-3.5 border-0 border-b border-rule bg-transparent font-sans text-[15px] text-ink outline-none focus:border-gold transition-colors resize-y placeholder:text-ink-faint"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "done"}
              className="mt-3 inline-flex items-center gap-2.5 px-8 py-4 font-sans text-[12px] tracking-[0.22em] uppercase font-medium border border-ink bg-ink text-cream transition-all duration-300 hover:bg-gold-deep hover:border-gold-deep disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "idle" && "Send Enquiry"}
              {status === "sending" && "Sending…"}
              {status === "done" && "✓ Thanks — we'll be in touch"}
              {status === "error" && "Something went wrong — please call us"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
