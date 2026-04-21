const perks = [
  "Early-bird SMS for new seasonal designs",
  "Complimentary birthday file-and-polish",
  "10% off gift cards for friends and family",
  "Priority booking during Christmas & bridal season",
];

/** Loyalty card + perks section. */
export default function Loyalty() {
  return (
    <section id="loyalty" className="py-[clamp(72px,10vw,140px)] relative">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(32px,6vw,80px)] items-center">

          {/* Loyalty card visual */}
          <div className="reveal">
            <div className="aspect-[1.6/1] bg-ink text-cream p-9 relative overflow-hidden shadow-[0_40px_80px_-40px_oklch(0.2_0.01_80/0.4)] rotate-[-2deg] transition-transform duration-[600ms] hover:rotate-0 hover:scale-[1.02]">
              {/* Radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,color-mix(in_oklab,oklch(0.72_0.12_85)_30%,transparent),transparent_45%),radial-gradient(circle_at_10%_110%,color-mix(in_oklab,oklch(0.72_0.12_85)_20%,transparent),transparent_50%)]" />

              <div className="relative z-[2] h-full flex flex-col justify-between">
                <div>
                  <div className="font-script text-[36px] text-gold leading-none">Perfectionails</div>
                  <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-[color-mix(in_oklab,oklch(0.985_0.008_85)_60%,transparent)] mt-1.5">
                    Members Circle
                  </div>
                </div>

                {/* Stamps 10-grid */}
                <div className="grid grid-cols-5 gap-2.5 my-6">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-full grid place-items-center font-mono text-[11px] ${
                        i < 4
                          ? "bg-gold border-none text-ink font-semibold"
                          : "border border-dashed border-[color-mix(in_oklab,oklch(0.985_0.008_85)_30%,transparent)] text-[color-mix(in_oklab,oklch(0.985_0.008_85)_40%,transparent)]"
                      }`}
                    >
                      {i < 4 ? "✦" : i + 1}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-end font-sans text-[10px] tracking-[0.18em] uppercase text-[color-mix(in_oklab,oklch(0.985_0.008_85)_60%,transparent)]">
                  <span>Reward · $30 off</span>
                  <span>MBR · 0427</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="reveal">
            <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold-deep font-medium">
              Members Circle
            </div>
            <h2 className="font-display text-[clamp(44px,6vw,72px)] mt-4 mb-6">
              Ten visits.<br />One lovely reward.
            </h2>
            <p className="text-ink-soft mb-5 max-w-[440px]">
              Join the Perfectionails Members Circle — free to sign up at your next visit. Collect a stamp on every service over $40 and we'll take $30 off your tenth.
            </p>

            <ul className="list-none my-6 mb-8">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-3.5 py-3 border-b border-rule text-[14px] before:content-['✦'] before:text-gold-deep before:text-[12px] before:flex-shrink-0"
                >
                  {perk}
                </li>
              ))}
            </ul>

            <a
              href="tel:0489191550"
              className="inline-flex items-center gap-2.5 px-8 py-4 font-sans text-[12px] tracking-[0.22em] uppercase font-medium border border-gold bg-gold text-cream transition-all duration-300 hover:bg-gold-deep hover:border-gold-deep"
            >
              Ask us to sign you up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
