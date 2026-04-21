"use client";

import { useState } from "react";

type ServiceCategory = "all" | "manicure" | "pedicure" | "enhance" | "art" | "waxing";

interface Service {
  num: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  pricePrefix?: string;
  category: Exclude<ServiceCategory, "all">;
}

const services: Service[] = [
  { num: "M · 01", name: "Classic Manicure", description: "Shape, cuticle, buff, polish — 30 min", duration: "30 min", price: "35", category: "manicure" },
  { num: "M · 02", name: "Gel / Shellac Manicure", description: "Long-lasting gel colour on natural nails", duration: "45 min", price: "50", category: "manicure" },
  { num: "M · 03", name: "SNS / Dipping Powder", description: "Natural-nail strengthener with glossy colour", duration: "60 min", price: "60", category: "manicure" },
  { num: "P · 01", name: "Classic Pedicure", description: "Soak, scrub, cuticle, massage, polish", duration: "45 min", price: "50", category: "pedicure" },
  { num: "P · 02", name: "Spa Pedicure", description: "Extended massage, mask and hot towels", duration: "60 min", price: "70", category: "pedicure" },
  { num: "P · 03", name: "Gel Pedicure", description: "Classic pedi + long-wear gel colour", duration: "60 min", price: "70", category: "pedicure" },
  { num: "E · 01", name: "Acrylic Full Set", description: "Classic acrylic extensions, shape of choice", duration: "90 min", price: "75", category: "enhance" },
  { num: "E · 02", name: "Acrylic Refill", description: "Re-balance and re-polish within 3 weeks", duration: "75 min", price: "55", category: "enhance" },
  { num: "E · 03", name: "Nail Extensions — Tips or Forms", description: "Custom length, finished in gel or acrylic", duration: "90 min", price: "80", pricePrefix: "from ", category: "enhance" },
  { num: "E · 04", name: "Soak-off & Removal", description: "Gentle removal of gel, acrylic or SNS", duration: "20 min", price: "15", category: "enhance" },
  { num: "A · 01", name: "French Tips / Ombré", description: "Classic, micro, or coloured French", duration: "+20 min", price: "10", pricePrefix: "+", category: "art" },
  { num: "A · 02", name: "Hand-painted Nail Art", description: "Florals, lines, chrome, foils — per nail", duration: "varies", price: "5", pricePrefix: "from ", category: "art" },
  { num: "A · 03", name: "Bridal & Occasion Set", description: "Consultation, trial options & custom design", duration: "2 hrs", price: "120", pricePrefix: "from ", category: "art" },
  { num: "W · 01", name: "Eyebrow Wax & Shape", description: "Precision tidy with hot wax", duration: "15 min", price: "18", category: "waxing" },
  { num: "W · 02", name: "Lip or Chin Wax", description: "Gentle, pre- and post-care included", duration: "10 min", price: "12", category: "waxing" },
  { num: "W · 03", name: "Full Leg / Arm Wax", description: "Strip wax, soothing after-balm", duration: "45 min", price: "55", pricePrefix: "from ", category: "waxing" },
];

const tabs: { label: string; value: ServiceCategory }[] = [
  { label: "All", value: "all" },
  { label: "Manicure", value: "manicure" },
  { label: "Pedicure", value: "pedicure" },
  { label: "Enhancements", value: "enhance" },
  { label: "Nail Art", value: "art" },
  { label: "Waxing", value: "waxing" },
];

/**
 * Services section with filterable tab navigation.
 * Filters are client-side — no network requests needed.
 */
export default function Services() {
  const [active, setActive] = useState<ServiceCategory>("all");

  const visible = services.filter(
    (s) => active === "all" || s.category === active
  );

  return (
    <section id="services" className="py-[clamp(72px,10vw,140px)] relative">
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-[72px] reveal">
          <div className="ornament mb-4 inline-flex">
            <span className="dot" />
          </div>
          <h2 className="font-display text-[clamp(48px,7vw,88px)] mt-4 mb-5">The Menu</h2>
          <p className="max-w-[540px] mx-auto text-ink-soft">
            Pricing is a guide — final quote depends on length, design complexity and any removals. All prices in AUD.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap reveal">
          {tabs.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`px-[22px] py-2.5 font-sans text-[11px] tracking-[0.22em] uppercase font-medium border transition-all duration-200 cursor-pointer
                ${active === value
                  ? "bg-ink text-cream border-ink"
                  : "text-ink-soft border-rule hover:border-gold hover:text-ink bg-transparent"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Service rows */}
        <div className="max-w-[960px] mx-auto border-t border-rule reveal">
          {visible.map((s) => (
            <div
              key={s.num}
              className="grid gap-7 py-7 border-b border-rule transition-all duration-300 hover:pl-3 group"
              style={{ gridTemplateColumns: "80px 1fr auto auto" }}
            >
              <div className="font-mono text-[11px] text-ink-faint tracking-[0.1em]">{s.num}</div>
              <div>
                <div className="font-serif text-[26px] text-ink transition-colors duration-300 group-hover:text-gold-deep">
                  {s.name}
                </div>
                <div className="font-sans text-[13px] text-ink-faint mt-1">{s.description}</div>
              </div>
              <div className="font-sans text-[12px] tracking-[0.15em] uppercase text-ink-faint min-w-[70px] text-right self-center">
                {s.duration}
              </div>
              <div className="font-serif text-[24px] text-ink font-medium min-w-[90px] text-right self-center">
                <small className="text-[13px] text-ink-faint font-normal mr-0.5">
                  {s.pricePrefix ?? "$"}
                </small>
                {s.price}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-[13px] text-ink-faint italic font-serif reveal">
          Prices subject to change. Please arrive 5 minutes before your appointment. A 24-hour cancellation notice is appreciated.
        </p>
      </div>
    </section>
  );
}
