"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#designs" },
  { label: "Loyalty", href: "/#loyalty" },
  { label: "Journal", href: "/journal" },
  { label: "Visit", href: "/#visit" },
];

/**
 * Fixed top navigation bar.
 * Shrinks and adds a border on scroll; collapses into a hamburger on mobile.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu when route changes */
  useEffect(() => setMobileOpen(false), [pathname]);

  const isJournal = pathname?.startsWith("/journal");

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300
          px-[clamp(20px,4vw,56px)]
          ${scrolled ? "py-3.5 border-b border-rule-soft" : "py-5"}
          bg-[color-mix(in_oklab,oklch(0.985_0.008_85)_82%,transparent)]
          backdrop-blur-[14px]`}
      >
        {/* Logo */}
        <Link href="/" className="font-script text-[32px] text-ink leading-none">
          Perfectio<span className="text-gold-deep">nails</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {navLinks.map(({ label, href }) => {
            const active = label === "Journal" && isJournal;
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`text-[12px] tracking-[0.18em] uppercase font-medium transition-colors duration-200
                    ${active ? "text-ink" : "text-ink-soft hover:text-gold-deep"}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3.5">
          <a
            href="tel:0489191550"
            className="text-[13px] tracking-[0.06em] text-ink font-medium flex items-center gap-2"
          >
            {/* Live green dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.68_0.15_142)] shadow-[0_0_0_3px_color-mix(in_oklab,oklch(0.68_0.15_142)_25%,transparent)]" />
            0489 191 550
          </a>
          <a
            href="tel:0489191550"
            className="inline-flex items-center gap-2.5 px-[22px] py-3 font-sans text-[11px] tracking-[0.22em] uppercase font-medium border border-ink bg-ink text-cream transition-all duration-300 hover:bg-gold-deep hover:border-gold-deep"
          >
            Book a Chair
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-10 h-10 border border-rule bg-transparent flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-cream pt-20 px-6 flex flex-col gap-1 md:hidden">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="py-4 border-b border-rule text-[13px] tracking-[0.22em] uppercase font-medium text-ink-soft hover:text-gold-deep transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href="tel:0489191550"
            className="mt-6 inline-flex items-center justify-center gap-2.5 px-8 py-4 font-sans text-[11px] tracking-[0.22em] uppercase font-medium border border-ink bg-ink text-cream"
          >
            Call to Book — 0489 191 550
          </a>
        </div>
      )}
    </>
  );
}
