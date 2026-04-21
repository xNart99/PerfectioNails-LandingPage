"use client";

import { useEffect, useState } from "react";

const schedule = [
  { day: "Monday", hours: "Closed", dayNum: 1, closed: true },
  { day: "Tuesday", hours: "9 am – 5:30 pm", dayNum: 2 },
  { day: "Wednesday", hours: "9 am – 5:30 pm", dayNum: 3 },
  { day: "Thursday", hours: "9 am – 7 pm", dayNum: 4 },
  { day: "Friday", hours: "9 am – 5:30 pm", dayNum: 5 },
  { day: "Saturday", hours: "9 am – 5 pm", dayNum: 6 },
  { day: "Sunday", hours: "10 am – 4 pm", dayNum: 0 },
];

/**
 * Location section — address, hours (today highlighted), and a decorative SVG map.
 * Hours highlight is computed client-side to avoid hydration mismatch.
 */
export default function Location() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(new Date().getDay());
  }, []);

  return (
    <section id="visit" className="py-[clamp(72px,10vw,140px)] bg-cream-warm relative">
      <div className="container">

        {/* Section heading */}
        <div className="text-center mb-12 reveal">
          <div className="ornament inline-flex mb-4"><span className="dot" /></div>
          <h2 className="font-display text-[clamp(48px,7vw,88px)] mt-4 mb-5">
            Find Us on Samuel Street
          </h2>
          <p className="text-ink-soft max-w-[520px] mx-auto">
            Tucked inside the Camp Hill Marketplace precinct — free parking, easy walk-ins.
          </p>
        </div>

        {/* Info + Map grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] border border-rule bg-cream min-h-[520px] reveal">

          {/* Info panel */}
          <div className="p-9 md:p-[52px] flex flex-col justify-center">
            <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold-deep font-medium">
              Visit
            </div>
            <h2 className="font-display text-[56px] leading-none mt-3.5 mb-8">
              Camp Hill, 4152.
            </h2>

            {[
              {
                label: "Address",
                value: (
                  <>
                    Shop 18/17 Samuel Street<br />
                    Camp Hill QLD 4152<br />
                    <a
                      href="https://maps.google.com/?q=Perfectionails+17+Samuel+Street+Camp+Hill"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-gold hover:text-gold-deep transition-colors"
                    >
                      Get directions ↗
                    </a>
                  </>
                ),
              },
              {
                label: "Phone",
                value: (
                  <>
                    <a href="tel:0489191550" className="border-b border-gold hover:text-gold-deep transition-colors">
                      0489 191 550
                    </a>
                    <br />
                    <span className="text-[13px] text-ink-soft">Text us — we'll reply between services.</span>
                  </>
                ),
              },
              {
                label: "Hours",
                value: (
                  <table className="w-full text-[14px]">
                    <tbody>
                      {schedule.map(({ day, hours, dayNum, closed }) => {
                        const isToday = today === dayNum && !closed;
                        return (
                          <tr key={day} className={`border-b border-dashed border-rule last:border-0 ${isToday ? "text-gold-deep font-medium" : ""}`}>
                            <td className="py-2">
                              {day}
                              {isToday && (
                                <span className="ml-2 font-sans text-[10px] tracking-[0.15em] uppercase text-gold-deep">
                                  ← today
                                </span>
                              )}
                            </td>
                            <td className={`py-2 text-right font-variant-nums ${closed ? "text-ink-faint" : "text-ink-soft"}`}>
                              {hours}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ),
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-4 items-start py-5 border-t border-rule last:border-b last:mb-7">
                <div className="font-sans text-[10px] tracking-[0.22em] uppercase text-ink-faint min-w-[72px] pt-1">
                  {label}
                </div>
                <div className="text-[15px] text-ink leading-[1.5]">{value}</div>
              </div>
            ))}
          </div>

          {/* Decorative SVG map */}
          <div className="relative min-h-[360px] md:min-h-[520px] overflow-hidden bg-gradient-to-br from-[oklch(0.93_0.015_90)] to-[oklch(0.96_0.01_85)]">
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="mapgrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M30 0 L0 0 0 30" fill="none" stroke="oklch(0.88 0.01 85)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="600" height="520" fill="oklch(0.95 0.012 85)"/>
              <rect width="600" height="520" fill="url(#mapgrid)"/>
              <path d="M0 180 Q 180 140, 300 200 T 600 240" stroke="white" strokeWidth="18" fill="none"/>
              <path d="M0 180 Q 180 140, 300 200 T 600 240" stroke="oklch(0.85 0.01 85)" strokeWidth="1" fill="none"/>
              <path d="M120 0 Q 150 200, 300 280 T 420 520" stroke="white" strokeWidth="14" fill="none"/>
              <path d="M120 0 Q 150 200, 300 280 T 420 520" stroke="oklch(0.85 0.01 85)" strokeWidth="1" fill="none"/>
              <path d="M500 0 Q 480 180, 380 260" stroke="white" strokeWidth="10" fill="none"/>
              <path d="M500 0 Q 480 180, 380 260" stroke="oklch(0.85 0.01 85)" strokeWidth="1" fill="none"/>
              <path d="M0 400 Q 200 380, 400 420 T 600 440" stroke="white" strokeWidth="12" fill="none"/>
              <rect x="60" y="220" width="80" height="60" fill="oklch(0.97 0.01 85)" stroke="oklch(0.88 0.01 85)"/>
              <rect x="180" y="250" width="100" height="70" fill="oklch(0.97 0.01 85)" stroke="oklch(0.88 0.01 85)"/>
              <rect x="400" y="300" width="120" height="80" fill="oklch(0.97 0.01 85)" stroke="oklch(0.88 0.01 85)"/>
              <rect x="60" y="60" width="70" height="80" fill="oklch(0.97 0.01 85)" stroke="oklch(0.88 0.01 85)"/>
              <ellipse cx="130" cy="420" rx="110" ry="60" fill="oklch(0.92 0.04 145)" opacity="0.7"/>
              <text x="80" y="110" fontFamily="Inter" fontSize="9" fill="oklch(0.55 0.008 80)" letterSpacing="1">MARTHA ST</text>
              <text x="220" y="160" fontFamily="Inter" fontSize="9" fill="oklch(0.55 0.008 80)" letterSpacing="1">OLD CLEVELAND RD</text>
              <text x="440" y="360" fontFamily="Inter" fontSize="9" fill="oklch(0.55 0.008 80)" letterSpacing="1">SAMUEL ST</text>
              <text x="140" y="430" fontFamily="Italiana" fontSize="12" fill="oklch(0.45 0.05 145)" letterSpacing="1">Whites Hill Reserve</text>
            </svg>

            {/* Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-[3]">
              <div className="w-[22px] h-[22px] rounded-full bg-gold border-4 border-cream shadow-[0_4px_16px_oklch(0.2_0.01_80/0.4)] relative">
                <span className="absolute inset-[-10px] rounded-full border border-gold animate-ping opacity-75" />
              </div>
              <div className="bg-ink text-cream px-3.5 py-2 font-sans text-[11px] tracking-[0.15em] uppercase whitespace-nowrap mt-3 ml-[-50px]">
                Perfectionails · 18/17
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=17+Samuel+Street+Camp+Hill"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2.5 right-2.5 bg-cream px-2 py-1 font-mono text-[9px] tracking-[0.1em] uppercase text-ink-faint z-[4] hover:text-gold-deep transition-colors"
            >
              OPEN IN GOOGLE MAPS ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
