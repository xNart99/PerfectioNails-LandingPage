import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import FeaturedGallery from "@/components/home/FeaturedGallery";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import Loyalty from "@/components/home/Loyalty";
import Location from "@/components/home/Location";
import FAQ from "@/components/home/FAQ";
import BlogPreview from "@/components/home/BlogPreview";
import Contact from "@/components/home/Contact";
import RevealObserver from "@/components/ui/RevealObserver";

export const metadata: Metadata = {
  title: "Perfectionails — Boutique Nail Salon in Camp Hill, Brisbane",
  description:
    "Perfectionails is a boutique nail salon in Camp Hill, Brisbane. Gel manicures, acrylics, SNS, nail art and waxing. Walk-ins welcome. Call 0489 191 550.",
  alternates: { canonical: "https://perfectionails.com.au" },
};

/** Landing page — assembles all home sections in order. */
export default function HomePage() {
  return (
    <>
      {/* Activates scroll-reveal animations across all sections */}
      <RevealObserver />

      <Hero />
      <MarqueeStrip />
      <About />
      <Services />
      <FeaturedGallery />
      <WhyUs />
      <Testimonials />
      <Loyalty />
      <Location />
      <FAQ />
      <BlogPreview />
      <Contact />
    </>
  );
}
