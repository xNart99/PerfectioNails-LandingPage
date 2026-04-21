/**
 * Injects structured data (JSON-LD) for Google's Local Business search result.
 * Helps rank in "nail salon near me" and local pack searches.
 */
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: "Perfectionails",
    description:
      "A boutique nail salon in Camp Hill, Brisbane offering manicures, pedicures, gel, acrylic, SNS, nail art and waxing.",
    url: "https://perfectionails.com.au",
    telephone: "+61489191550",
    email: "hello@perfectionails.com.au",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop 18/17 Samuel Street",
      addressLocality: "Camp Hill",
      addressRegion: "QLD",
      postalCode: "4152",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -27.4975,
      longitude: 153.0689,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Friday"], opens: "09:00", closes: "17:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "16:00" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "200",
    },
    image: "https://perfectionails.com.au/og-image.jpg",
    priceRange: "$$",
    servesCuisine: undefined,
    hasMap: "https://maps.google.com/?q=Perfectionails+17+Samuel+Street+Camp+Hill",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
