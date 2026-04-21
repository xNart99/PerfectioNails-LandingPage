import Link from "next/link";

const exploreLinks = [
  { label: "Services & Pricing", href: "/#services" },
  { label: "Gallery", href: "/#designs" },
  { label: "Members Circle", href: "/#loyalty" },
  { label: "Journal", href: "/journal" },
  { label: "FAQ", href: "/#faq" },
];

const hours = [
  "Tue – Fri · 9am–5:30pm",
  "Thu late · until 7pm",
  "Sat · 9am–5pm",
  "Sun · 10am–4pm",
  "Mon · closed",
];

/** Site-wide footer — static server component. */
export default function Footer() {
  return (
    <footer className="bg-ink text-cream pt-20 pb-8 relative z-[2]">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-14 border-b border-[color-mix(in_oklab,oklch(0.985_0.008_85)_15%,transparent)]">

          {/* Brand */}
          <div>
            <div className="font-script text-[44px] text-cream leading-none">
              Perfectio<span className="text-gold">nails</span>
            </div>
            <p className="mt-4 text-sm text-[color-mix(in_oklab,oklch(0.985_0.008_85)_65%,transparent)] max-w-xs">
              A boutique nail studio in Camp Hill, Brisbane — quietly perfectionist about hands, feet, and the hour you spend with us.
            </p>
          </div>

          {/* Visit column */}
          <div>
            <h5 className="font-sans text-[11px] tracking-[0.22em] uppercase font-medium text-gold mb-5">
              Visit
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm text-[color-mix(in_oklab,oklch(0.985_0.008_85)_75%,transparent)]">
              <li>Shop 18/17 Samuel Street</li>
              <li>Camp Hill QLD 4152</li>
              <li>
                <a href="tel:0489191550" className="hover:text-gold transition-colors">
                  0489 191 550
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@perfectionails.com.au"
                  className="hover:text-gold transition-colors"
                >
                  hello@perfectionails.com.au
                </a>
              </li>
            </ul>
          </div>

          {/* Explore column */}
          <div>
            <h5 className="font-sans text-[11px] tracking-[0.22em] uppercase font-medium text-gold mb-5">
              Explore
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[color-mix(in_oklab,oklch(0.985_0.008_85)_75%,transparent)] hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours column */}
          <div>
            <h5 className="font-sans text-[11px] tracking-[0.22em] uppercase font-medium text-gold mb-5">
              Hours
            </h5>
            <ul className="flex flex-col gap-2.5 text-sm text-[color-mix(in_oklab,oklch(0.985_0.008_85)_75%,transparent)]">
              {hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-[color-mix(in_oklab,oklch(0.985_0.008_85)_55%,transparent)]">
          <div>© 2026 Perfectionails · ABN 00 000 000 000</div>

          {/* Social icons */}
          <div className="flex gap-3.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-[color-mix(in_oklab,oklch(0.985_0.008_85)_20%,transparent)] grid place-items-center hover:bg-gold hover:border-gold hover:text-ink transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-[color-mix(in_oklab,oklch(0.985_0.008_85)_20%,transparent)] grid place-items-center hover:bg-gold hover:border-gold hover:text-ink transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.3-2 2-2h2V2h-3c-3 0-4.5 1.8-4.5 4.5V10H6v4h3.5v8H13z"/>
              </svg>
            </a>
            <a
              href="https://maps.google.com/?q=Perfectionails+17+Samuel+Street+Camp+Hill"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps"
              className="w-9 h-9 rounded-full border border-[color-mix(in_oklab,oklch(0.985_0.008_85)_20%,transparent)] grid place-items-center hover:bg-gold hover:border-gold hover:text-ink transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c2.5 0 4.5 1 6 2.5L16 8c-1-1-2.5-1.5-4-1.5-3 0-5.5 2.5-5.5 5.5S9 17.5 12 17.5c2.5 0 4.5-1.5 5-4H12v-3h9z"/>
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-1.5">
            Made with care in Camp Hill · Powered by{" "}
            <a
              href="https://github.com/xNart99"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-gold transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
              </svg>
              xNart99
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
