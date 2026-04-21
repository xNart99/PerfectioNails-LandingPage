"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need to book in advance?",
    a: "Walk-ins are always welcome, but Thursdays after 4pm and Saturdays tend to fill fast. For gel sets, acrylics or nail art we recommend calling a day or two ahead — 0489 191 550.",
  },
  {
    q: "How long does gel last?",
    a: "On most guests, 2.5 – 3 weeks before the first touch-up. We'll always prep the nail plate properly so you get the full wear-time without lifting.",
  },
  {
    q: "Are your tools sterilised?",
    a: "Yes. Metal implements go through an autoclave after every single guest; files, buffers and pedicure basin liners are single-use. We're happy to walk you through it.",
  },
  {
    q: "Do you remove work done elsewhere?",
    a: "Absolutely. Soak-offs are $15 and we always assess the nail health before deciding whether to re-apply or let your nails rest.",
  },
  {
    q: "Can I bring a design inspo photo?",
    a: "Please do — it really helps. Note that hand-painted designs take time; for very detailed sets (florals, chrome mixed with art) please allow 90 minutes and book ahead.",
  },
  {
    q: "Is there parking?",
    a: "Yes — Samuel Street has free 2-hour street parking, and the Camp Hill Marketplace carpark is a 1-minute walk away.",
  },
  {
    q: "Do you cater to bridal parties?",
    a: "We do. We take one bridal party at a time so the studio stays quiet; we'll do a trial 4–6 weeks before the day and design a look tailored to your outfit and setting.",
  },
];

/** Accordion FAQ — each item toggles independently. */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-[clamp(72px,10vw,140px)] relative">
      <div className="container">
        <div className="max-w-[860px] mx-auto">

          {/* Header */}
          <div className="text-center mb-14 reveal">
            <div className="ornament inline-flex mb-4"><span className="dot" /></div>
            <h2 className="font-display text-[clamp(44px,6vw,72px)] mt-4 mb-4">
              Before you visit.
            </h2>
            <p className="text-ink-soft">
              Everything we're usually asked — and a few things we wish people asked more.
            </p>
          </div>

          {/* Accordion */}
          <div className="reveal">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className="border-b border-rule py-6 cursor-pointer"
                onClick={() => toggle(i)}
              >
                <div className={`flex justify-between items-center gap-6 font-serif text-[22px] transition-colors duration-200 ${openIndex === i ? "text-gold-deep" : "text-ink hover:text-gold-deep"}`}>
                  <span>{q}</span>
                  <span
                    className={`w-7 h-7 rounded-full border border-rule grid place-items-center font-serif text-[18px] text-ink-soft flex-shrink-0 transition-all duration-300 ${
                      openIndex === i ? "bg-gold border-gold text-cream rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </div>

                {openIndex === i && (
                  <div className="pt-4 text-ink-soft text-[15.5px] leading-[1.65]">
                    {a.includes("0489") ? (
                      <>
                        {a.split("0489 191 550")[0]}
                        <a href="tel:0489191550" className="border-b border-gold hover:text-gold-deep transition-colors">
                          0489 191 550
                        </a>
                        {a.split("0489 191 550")[1]}
                      </>
                    ) : (
                      a
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
