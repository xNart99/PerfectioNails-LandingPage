import Image from "next/image";

const designs = [
  {
    src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=900&auto=format&fit=crop",
    alt: "Milk & Pearl — Gel, Almond shape",
    tag: "Signature",
    caption: "Milk & Pearl",
    sub: "Gel · Almond shape",
    gridClass: "col-span-12 md:col-span-5 row-span-5",
  },
  {
    src: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=700&auto=format&fit=crop",
    alt: "Golden Hour — Chrome, Short square",
    tag: "New",
    caption: "Golden Hour",
    sub: "Chrome · Short square",
    gridClass: "col-span-12 md:col-span-4 row-span-3",
  },
  {
    src: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=500&auto=format&fit=crop",
    alt: "Orchid — Hand-painted floral",
    tag: undefined,
    caption: "Orchid",
    sub: "Hand-painted floral",
    gridClass: "col-span-12 md:col-span-3 row-span-3",
  },
  {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&auto=format&fit=crop",
    alt: "Ribbon French — Micro tip in gold",
    tag: undefined,
    caption: "Ribbon French",
    sub: "Micro tip in gold",
    gridClass: "col-span-12 md:col-span-3 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1604654894611-6973b376cbde?w=800&auto=format&fit=crop",
    alt: "Veil — Sheer gel & crystal",
    tag: "Bridal",
    caption: "Veil",
    sub: "Sheer gel & crystal",
    gridClass: "col-span-12 md:col-span-4 row-span-2",
  },
];

/** Asymmetric CSS grid gallery of featured nail designs. */
export default function FeaturedGallery() {
  return (
    <section id="designs" className="py-[clamp(72px,10vw,140px)] bg-cream-warm relative">
      <div className="container">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-14 reveal">
          <div>
            <div className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold-deep font-medium">
              Featured Designs
            </div>
            <h2 className="font-display text-[clamp(44px,6vw,72px)] mt-4 max-w-[640px]">
              This season, softly<br />in the details.
            </h2>
          </div>
          <a
            href="/journal"
            className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.2em] uppercase font-medium text-ink pb-1 border-b border-gold transition-all duration-300 hover:text-gold-deep hover:gap-3.5"
          >
            View full gallery →
          </a>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-12 gap-3.5 reveal"
          style={{ gridAutoRows: "80px" }}
        >
          {designs.map(({ src, alt, tag, caption, sub, gridClass }) => (
            <div
              key={caption}
              className={`${gridClass} relative overflow-hidden cursor-pointer group`}
            >
              <Image src={src} alt={alt} fill className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]" />

              {tag && (
                <div className="absolute top-3.5 left-3.5 bg-cream px-3 py-1.5 font-sans text-[10px] tracking-[0.2em] uppercase font-medium text-ink z-[3]">
                  {tag}
                </div>
              )}

              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[oklch(0.1_0_0/0.7)] to-transparent z-[3] translate-y-full transition-transform duration-[400ms] group-hover:translate-y-0">
                <h4 className="font-serif text-cream text-[22px] mb-0.5">{caption}</h4>
                <p className="text-[12px] text-cream/85 tracking-[0.08em]">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
