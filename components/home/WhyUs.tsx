const reasons = [
  {
    num: "01",
    title: "Senior technicians only",
    body: "Every set — from classic to custom art — is done by an experienced nail artist. No trainees on your fingertips.",
    icon: (
      <svg className="w-11 h-11 text-gold-deep" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M22 6 L28 14 L38 16 L30 24 L32 36 L22 30 L12 36 L14 24 L6 16 L16 14 Z"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Hospital-grade sanitation",
    body: "Autoclave-sterilised tools, single-use files and buffers, and a fresh liner for every pedicure basin.",
    icon: (
      <svg className="w-11 h-11 text-gold-deep" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="22" cy="22" r="12"/>
        <path d="M22 10 V 6 M22 34 V 38 M10 22 H 6 M34 22 H 38"/>
        <circle cx="22" cy="22" r="4" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Non-toxic, 10-free polish",
    body: "We use premium 10-free gel and lacquer brands — better for your nails, and for the air in the room.",
    icon: (
      <svg className="w-11 h-11 text-gold-deep" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M22 6 C 14 10, 10 18, 14 28 C 16 34, 28 34, 30 28 C 34 18, 30 10, 22 6 Z"/>
        <path d="M18 22 Q 22 18, 26 22"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Unrushed appointments",
    body: "We book fewer chairs, longer slots. So the only thing hurried at Perfectionails is the kettle.",
    icon: (
      <svg className="w-11 h-11 text-gold-deep" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="8" y="14" width="28" height="20" rx="1"/>
        <path d="M8 20 H 36"/>
        <path d="M16 14 V 10 M28 14 V 10"/>
      </svg>
    ),
  },
];

/** Four-column differentiation pillars. */
export default function WhyUs() {
  return (
    <section id="why" className="py-[clamp(72px,10vw,140px)] relative">
      <div className="container">
        <div className="text-center reveal">
          <div className="ornament inline-flex mb-4"><span className="dot" /></div>
          <h2 className="font-display text-[clamp(48px,7vw,88px)] mt-4 mb-5">
            The Perfectionails<br />difference.
          </h2>
          <p className="text-ink-soft max-w-[520px] mx-auto">
            Four small commitments we make to every guest, every visit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-16 border-t border-b border-rule reveal">
          {reasons.map(({ num, title, body, icon }, i) => (
            <div
              key={num}
              className={`p-10 ${i < reasons.length - 1 ? "border-b sm:border-b-0 sm:border-r border-rule" : ""} last:border-r-0`}
            >
              <div className="font-mono text-[11px] text-gold-deep tracking-[0.2em] mb-6 flex items-center gap-2.5 after:flex-1 after:h-px after:bg-rule">
                {num}
              </div>
              <div className="mb-6">{icon}</div>
              <h3 className="font-serif text-[24px] mb-3 leading-[1.2]">{title}</h3>
              <p className="text-[14px] text-ink-soft leading-[1.6]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
