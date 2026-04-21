/** Infinite scrolling service names marquee strip. */
const items = [
  "Gel Manicure",
  "Signature Pedicure",
  "Nail Art",
  "SNS & Dipping",
  "Acrylic Extensions",
  "Waxing",
  "Walk-ins Welcome",
];

export default function MarqueeStrip() {
  /* Duplicate the array so the seamless loop works at -50% offset */
  const doubled = [...items, ...items];

  return (
    <div
      className="py-7 border-t border-b border-rule overflow-hidden bg-cream-warm relative z-[2]"
      aria-hidden="true"
    >
      <div className="flex gap-[60px] animate-marquee whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="font-display text-[26px] text-ink flex items-center gap-[60px] after:content-['✦'] after:text-gold after:text-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
