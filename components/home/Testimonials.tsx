const testimonials = [
  {
    stars: 5,
    quote: "Came in for a gel mani — left obsessed. The attention to shaping and cuticle work is something else. Three weeks on and still chip-free.",
    name: "Emma H.",
    location: "Camp Hill",
    initial: "E",
  },
  {
    stars: 5,
    quote: "Finally found my spot. The studio is so quiet and calm, the massage during pedicure is unreal, and Chi is an absolute artist. Bridal booked.",
    name: "Sophie R.",
    location: "Coorparoo",
    initial: "S",
  },
  {
    stars: 5,
    quote: "I'm fussy and I have very thin nails. They listened, suggested SNS over acrylic, and did the softest almond shape. Booking in again next week.",
    name: "Maria L.",
    location: "Carindale",
    initial: "M",
  },
];

/** Dark-background testimonials section with Google badge. */
export default function Testimonials() {
  return (
    <section id="reviews" className="py-[clamp(72px,10vw,140px)] bg-ink text-cream relative z-[2]">
      <div className="container">

        {/* Head */}
        <div className="text-center mb-16 reveal">
          <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold font-medium">
            Kind Words
          </div>
          <h2 className="font-display text-[clamp(48px,7vw,80px)] mt-4 mb-5 text-cream">
            Loved by locals<br />on Samuel Street.
          </h2>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[color-mix(in_oklab,oklch(0.985_0.008_85)_8%,transparent)] border border-[color-mix(in_oklab,oklch(0.985_0.008_85)_15%,transparent)] font-sans text-[12px] tracking-[0.1em] mt-5">
            <span className="text-gold tracking-[2px]">★★★★★</span>
            <span>4.9 on Google — 200+ reviews</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal">
          {testimonials.map(({ stars, quote, name, location, initial }) => (
            <div
              key={name}
              className="p-9 bg-[color-mix(in_oklab,oklch(0.985_0.008_85)_4%,transparent)] border border-[color-mix(in_oklab,oklch(0.985_0.008_85)_12%,transparent)]"
            >
              <div className="text-gold text-[14px] tracking-[3px] mb-5">
                {"★".repeat(stars)}
              </div>
              <p className="font-serif italic text-[18px] leading-[1.6] text-cream mb-6">
                "{quote}"
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-[color-mix(in_oklab,oklch(0.985_0.008_85)_12%,transparent)]">
                <div className="w-[42px] h-[42px] rounded-full bg-gold text-ink grid place-items-center font-serif text-[16px] font-medium flex-shrink-0">
                  {initial}
                </div>
                <div>
                  <div className="font-medium text-[14px] text-cream">{name}</div>
                  <div className="font-sans text-[11px] tracking-[0.15em] uppercase text-[color-mix(in_oklab,oklch(0.985_0.008_85)_55%,transparent)] mt-0.5">
                    {location} · 4.9 Google
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
