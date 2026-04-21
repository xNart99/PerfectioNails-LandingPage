import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

/** Shared layout for all public-facing pages (home, journal, post). */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
