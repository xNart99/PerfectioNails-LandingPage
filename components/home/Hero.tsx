import Image from "next/image";

/**
 * Landing page hero — two-column grid with heading, stats,
 * and a stacked visual with a floating review card.
 */
export default function Hero() {
  return (
    <section className="min-h-screen pt-[120px] pb-20 grid place-items-center relative overflow-hidden">
      <div className="container w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-[clamp(32px,6vw,88px)] items-center">

          {/* Text column */}
          <div className="reveal">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 font-sans text-[11px] tracking-[0.32em] uppercase text-gold-deep mb-7">
              <span className="w-9 h-px bg-gold" />
              Camp Hill · Brisbane · Est. 2025
            </div>

            <h1 className="font-display text-[clamp(56px,9vw,128px)] leading-[0.95] tracking-[-0.01em] text-ink mb-7">
              Hands that <em className="font-serif italic font-light">feel</em><br />
              <span className="font-script text-[0.7em] text-gold-deep not-italic inline-block translate-y-[0.1em]">
                perfectly
              </span>{" "}
              kept.
            </h1>

            <p className="text-[17px] text-ink-soft max-w-[460px] mb-10 leading-[1.65]">
              A boutique nail studio on Samuel Street, where quiet luxury, premium products and considered design meet — by appointment or walk in.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center mb-12">
              <a
                href="tel:0489191550"
                className="inline-flex items-center gap-2.5 px-8 py-4 font-sans text-[12px] tracking-[0.22em] uppercase font-medium border border-ink bg-ink text-cream transition-all duration-300 hover:bg-gold-deep hover:border-gold-deep"
              >
                Call to Book
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2.5 px-8 py-4 font-sans text-[12px] tracking-[0.22em] uppercase font-medium border border-ink text-ink bg-transparent transition-all duration-300 hover:bg-ink hover:text-cream"
              >
                View Services
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-7 pt-8 border-t border-rule max-w-[520px]">
              {[
                { num: "4.9", suffix: "★", label: "Google Rating" },
                { num: "200", suffix: "+", label: "Happy Locals" },
                { num: "7", suffix: "", label: "Days a Week" },
              ].map(({ num, suffix, label }) => (
                <div key={label}>
                  <div className="font-serif text-[32px] text-ink leading-none mb-1.5">
                    {num}
                    <span className="text-gold-deep italic">{suffix}</span>
                  </div>
                  <div className="font-sans text-[10.5px] tracking-[0.2em] uppercase text-ink-faint">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual column */}
          <div className="reveal relative aspect-[4/5] max-w-[420px] mx-auto md:max-w-none md:mx-0">
            {/* Main image */}
            <div className="absolute inset-0 z-[2] rotate-[1deg] overflow-hidden shadow-[0_30px_80px_-30px_oklch(0.2_0.01_80/0.3)]">
              <Image
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&auto=format&fit=crop"
                alt="Nail artwork at Perfectionails Camp Hill"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Sub image */}
            <div className="absolute w-[42%] aspect-[3/4] bottom-[-40px] left-[-40px] z-[3] rotate-[-4deg] overflow-hidden border-[6px] border-cream shadow-[0_20px_50px_-20px_oklch(0.2_0.01_80/0.4)]">
              <Image
                src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500&auto=format&fit=crop"
                alt="Detail nail design"
                fill
                className="object-cover"
              />
            </div>

            {/* Orchid SVG */}
            <svg
              className="absolute top-[-30px] right-[-30px] w-[180px] z-[4] opacity-90 pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
            >
              <g opacity="0.95">
                <path d="M100 40 C 70 45, 55 65, 60 90 C 65 110, 85 118, 100 110 C 115 118, 135 110, 140 90 C 145 65, 130 45, 100 40 Z" fill="#ffffff" stroke="#d9c89a" strokeWidth="0.6"/>
                <ellipse cx="100" cy="90" rx="12" ry="18" fill="#e5c56c"/>
                <circle cx="100" cy="82" r="3" fill="#b8923f"/>
                <path d="M40 100 C 30 110, 28 130, 45 138 C 55 142, 70 135, 72 120 C 73 108, 58 95, 40 100 Z" fill="#ffffff" stroke="#d9c89a" strokeWidth="0.5"/>
                <path d="M160 100 C 170 110, 172 130, 155 138 C 145 142, 130 135, 128 120 C 127 108, 142 95, 160 100 Z" fill="#ffffff" stroke="#d9c89a" strokeWidth="0.5"/>
                <path d="M100 150 C 92 158, 95 172, 108 172 C 118 172, 122 160, 118 152 C 115 146, 105 146, 100 150 Z" fill="#ffffff" stroke="#d9c89a" strokeWidth="0.5"/>
              </g>
            </svg>

            {/* Floating review card */}
            <div className="hidden lg:block absolute right-[-24px] top-1/2 z-[5] bg-cream p-[18px_22px] border border-rule max-w-[220px] shadow-[0_20px_40px_-20px_oklch(0.2_0.01_80/0.25)] rotate-[3deg]">
              <div className="text-gold text-[14px] tracking-[2px] mb-2">★★★★★</div>
              <p className="font-serif italic text-[15px] leading-[1.4] text-ink mb-1.5">
                "Best nail experience I've had in Brisbane."
              </p>
              <div className="text-[10px] tracking-[0.18em] uppercase text-ink-faint">
                — Emma · Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
