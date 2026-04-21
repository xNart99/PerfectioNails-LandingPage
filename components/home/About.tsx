import Image from "next/image";

/** About section — two-column layout with image mosaic and story text. */
export default function About() {
  return (
    <section id="about" className="py-[clamp(72px,10vw,140px)] relative">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[clamp(40px,7vw,100px)] items-center">
          {/* Image mosaic */}
          <div
            className="reveal grid grid-cols-2 gap-3.5"
            style={{ gridTemplateRows: "200px 140px" }}
          >
            <div className="row-span-2 ph relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=700&auto=format&fit=crop"
                alt="Perfectionails studio interior"
                fill
                className="object-cover"
              />
            </div>
            <div className="ph relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=500&auto=format&fit=crop"
                alt="Detail shot"
                fill
                className="object-cover"
              />
            </div>
            <div className="ph relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&auto=format&fit=crop"
                alt="Nail tools"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="reveal">
            <div className="eyebrow font-sans text-[11px] tracking-[0.32em] uppercase text-gold-deep font-medium">
              Our Story
            </div>
            <h2 className="font-display text-[clamp(44px,6vw,76px)] mt-4 mb-0 leading-none">
              A small studio,
              <br />a steady hand.
            </h2>

            {/* Drop-cap paragraph */}
            <p
              className="font-serif text-[20px] leading-[1.55] text-ink-soft mt-7 mb-5"
              style={
                {
                  "--first-letter-font": "var(--font-italiana)",
                } as React.CSSProperties
              }
            >
              <span className="float-left font-display text-[3.2em] leading-[0.85] pr-3 pt-1.5 text-gold-deep">
                P
              </span>
              erfectionails opened its doors on Samuel Street in 2025 with a
              simple intention — to offer Camp Hill a quieter, more considered
              place to look after your hands and feet.
            </p>
            <p className="text-ink-soft mb-5">
              We keep our bookings small so every guest gets unhurried care,
              hospital-grade sanitation, and the premium gels, polishes and
              lotions we'd happily wear ourselves. No plastic music, no rush, no
              upselling — just beautifully kept nails and an hour that feels
              like yours.
            </p>

            <div className="font-script text-[56px] text-gold-deep leading-none mt-8">
              PerfectioNails Team
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
